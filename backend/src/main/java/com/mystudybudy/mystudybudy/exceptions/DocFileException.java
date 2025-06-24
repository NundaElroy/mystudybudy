package com.mystudybudy.mystudybudy.exceptions;

public class DocFileException  extends  RuntimeException{

    public  DocFileException(String message){
        super(message);
    }

    public  DocFileException(String message,Throwable cause){
        super(message,cause);
    }

}
