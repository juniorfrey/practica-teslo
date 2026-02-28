import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @MinLength(6, {
    message:`-The password must have at least 6 characters \n-La contraseña debe tener al menos 6 caracteres`,
  })
  @MaxLength(50, {
    message:`-The password must have at most 50 characters \n-La contraseña debe tener como máximo 50 caracteres`,
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `- The password must have a Uppercase, lowercase letter and a number -La contraseña debe tener una letra mayúscula, una minúscula y un número`,
  })
  password: string;
}
