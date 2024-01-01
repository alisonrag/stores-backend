import { User } from '@prisma/client';
import { IsEmail, IsString, Matches, MaxLength, MinLength, } from 'class-validator';

export class CreateUserDto implements User {
    id: number;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string;

    @IsString()
    name: string;

    created_at: Date;
    updated_at: Date;
}