package com.example.myfirstapp;

import android.util.Log;

public class Console {
	public static final String TAG = "myapp";

	public void log(String msg){
		Log.d(TAG, msg);
	}
}