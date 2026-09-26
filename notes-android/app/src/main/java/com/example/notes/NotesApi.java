package com.example.notes;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class NotesApi {
    // 10.0.2.2 is your computer's localhost as seen from the Android emulator.
    // On a real phone, use your computer's Wi-Fi IP instead, e.g. http://192.168.1.20:4002
    private static final String BASE_URL = "http://10.0.2.2:4002/api/notes";

    public static List<Note> list() throws Exception {
        JSONArray array = new JSONArray(request("GET", BASE_URL, null));
        List<Note> notes = new ArrayList<>();
        for (int i = 0; i < array.length(); i++) {
            notes.add(Note.fromJson(array.getJSONObject(i)));
        }
        return notes;
    }

    public static Note create(String title, String body) throws Exception {
        return Note.fromJson(new JSONObject(request("POST", BASE_URL, toJson(title, body))));
    }

    public static Note update(String id, String title, String body) throws Exception {
        return Note.fromJson(new JSONObject(request("PUT", BASE_URL + "/" + id, toJson(title, body))));
    }

    public static void delete(String id) throws Exception {
        request("DELETE", BASE_URL + "/" + id, null);
    }

    private static JSONObject toJson(String title, String body) throws Exception {
        return new JSONObject().put("title", title).put("body", body);
    }

    private static String request(String method, String url, JSONObject json) throws Exception {
        HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
        conn.setRequestMethod(method);
        conn.setConnectTimeout(5000);
        conn.setReadTimeout(5000);

        if (json != null) {
            conn.setDoOutput(true);
            conn.setRequestProperty("Content-Type", "application/json");
            try (OutputStream out = conn.getOutputStream()) {
                out.write(json.toString().getBytes(StandardCharsets.UTF_8));
            }
        }

        int status = conn.getResponseCode();
        String text = read(status < 400 ? conn.getInputStream() : conn.getErrorStream());
        conn.disconnect();

        if (status >= 400) {
            String message = text.startsWith("{") ? new JSONObject(text).optString("error") : "";
            throw new Exception(message.isEmpty() ? "HTTP " + status : message);
        }
        return text;
    }

    private static String read(InputStream in) throws Exception {
        if (in == null) return "";
        StringBuilder text = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) text.append(line);
        }
        return text.toString();
    }
}
