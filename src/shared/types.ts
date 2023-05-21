import React from "react";

export interface DefaultProps {
  className?: string;
}

export type TextAreaChange = React.ChangeEventHandler<HTMLTextAreaElement>;

export type Submit = React.MouseEventHandler<HTMLButtonElement>;

export interface Choice {
  text?: string;
  [key: string]: any;
}

export type Choices = Array<Choice>;
