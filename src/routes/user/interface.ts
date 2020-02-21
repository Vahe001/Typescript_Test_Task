import {Request} from 'express';

export interface Decoded
{
  id: number;
}

export interface RequestCustom extends Request
{
  decoded: Decoded;
}