package com.example.notes;

import android.app.Activity;
import android.app.AlertDialog;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MainActivity extends Activity {
    // Android does not allow network calls on the main (UI) thread, so they run here
    private final ExecutorService background = Executors.newSingleThreadExecutor();
    private final List<Note> notes = new ArrayList<>();
    private ArrayAdapter<Note> adapter;

    interface Work<T> {
        T run() throws Exception;
    }

    interface Done<T> {
        void accept(T result);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        adapter = new ArrayAdapter<Note>(this, android.R.layout.simple_list_item_2, android.R.id.text1, notes) {
            @Override
            public View getView(int position, View convertView, ViewGroup parent) {
                View row = super.getView(position, convertView, parent);
                Note note = getItem(position);
                ((TextView) row.findViewById(android.R.id.text1)).setText(note.title);
                ((TextView) row.findViewById(android.R.id.text2)).setText(note.body);
                return row;
            }
        };

        ListView list = findViewById(R.id.list);
        list.setAdapter(adapter);
        list.setEmptyView(findViewById(R.id.empty));
        list.setOnItemClickListener((parent, view, position, id) -> showNoteDialog(notes.get(position)));
        list.setOnItemLongClickListener((parent, view, position, id) -> {
            confirmDelete(notes.get(position));
            return true;
        });

        findViewById(R.id.add).setOnClickListener(v -> showNoteDialog(null));
        findViewById(R.id.refresh).setOnClickListener(v -> loadNotes());

        loadNotes();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        background.shutdown();
    }

    // Runs work in the background, then hands the result (or the error) back to the UI thread
    private <T> void call(Work<T> work, Done<T> done) {
        background.execute(() -> {
            try {
                T result = work.run();
                runOnUiThread(() -> done.accept(result));
            } catch (Exception e) {
                runOnUiThread(() -> Toast.makeText(this, e.getMessage(), Toast.LENGTH_LONG).show());
            }
        });
    }

    private void loadNotes() {
        call(NotesApi::list, result -> {
            notes.clear();
            notes.addAll(result);
            adapter.notifyDataSetChanged();
        });
    }

    // note == null means "create a new note"
    private void showNoteDialog(Note note) {
        View form = getLayoutInflater().inflate(R.layout.dialog_note, null);
        EditText title = form.findViewById(R.id.title);
        EditText body = form.findViewById(R.id.body);
        if (note != null) {
            title.setText(note.title);
            body.setText(note.body);
        }

        new AlertDialog.Builder(this)
                .setTitle(note == null ? "New note" : "Edit note")
                .setView(form)
                .setPositiveButton("Save", (dialog, which) -> {
                    String t = title.getText().toString();
                    String b = body.getText().toString();
                    call(() -> note == null ? NotesApi.create(t, b) : NotesApi.update(note.id, t, b),
                            saved -> loadNotes());
                })
                .setNegativeButton("Cancel", null)
                .show();
    }

    private void confirmDelete(Note note) {
        new AlertDialog.Builder(this)
                .setTitle("Delete \"" + note.title + "\"?")
                .setPositiveButton("Delete", (dialog, which) -> call(() -> {
                    NotesApi.delete(note.id);
                    return null;
                }, done -> loadNotes()))
                .setNegativeButton("Cancel", null)
                .show();
    }
}
