package com.example.notes;

import org.json.JSONObject;

public class Note {
    public final String id;
    public final String title;
    public final String body;

    public Note(String id, String title, String body) {
        this.id = id;
        this.title = title;
        this.body = body;
    }

    // MongoDB sends the id as "_id"
    public static Note fromJson(JSONObject json) {
        return new Note(json.optString("_id"), json.optString("title"), json.optString("body"));
    }
}
