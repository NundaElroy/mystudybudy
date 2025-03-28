package com.mystudybudy.mystudybudy.dtos;

import java.time.LocalDateTime;

public class ResponseDTO<T> {
    private String status;
    private T data;
    private String error;
    private String message;
    private String path;
    private int statusCode;


    public ResponseDTO(String status, T data, String error, String message, String path, int statusCode) {
        this.status = status;
        this.data = data;
        this.error = error;
        this.message = message;
        this.path = path;
        this.statusCode = statusCode;

    }

    public ResponseDTO(){

    }

    public ResponseDTO(String status, T data){
        this.status = status;
        this.data  = data;

    }

    public String getStatus() {
        return status;
    }

    public T getData() {
        return data;
    }

    public String getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }

    public String getPath() {
        return path;
    }

    public int getStatusCode() {
        return statusCode;
    }


}

