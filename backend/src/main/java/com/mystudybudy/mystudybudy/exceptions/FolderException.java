package com.mystudybudy.mystudybudy.exceptions;

public class FolderException extends RuntimeException{

    public  FolderException(String message){
        super(message);
    }

    public  FolderException(String message,Throwable cause){
        super(message,cause);
    }

}
