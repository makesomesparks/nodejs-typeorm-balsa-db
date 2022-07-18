export interface Allows
{
   [ key: string ]: string[];
}

export interface Tokens
{
   token: string;
   unixtime: string;
   expired: boolean;
}

export interface AccessScheme
{
   users: { [ key: string ]: Tokens[]; };
   passthrough: { ipv4: Allows; };
}