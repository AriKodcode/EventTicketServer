# EventTicketServer text

ari durlacher, hermon, 212035687

#

It's a software that lets you register with a username and password. Once you have a registered name, you can create events, buy tickets, and get a summary of all the tickets you've bought.

#

To run the software you must write in the terminal you must install first

```
npm install
```

Then

```
npm start
```

or

> [link to render](https://eventticketserver-43t4.onrender.com/)

#

to add user:
add to url:

> /user/register

and then in the body

```
{
"username": "string",
"password": "string"
}
```

#

to create event add to url

> /creator/events

and then in the body

```
{
"eventName": "string",
"ticketsForSale": number,
"username": "string",
“password”:”string”
}
```

#

to buy a ticket add to url:

> /users/tickets/buy

and then in the body:

```
{
"username": "string",
“password”: “string”,
"eventName": "string",
"quantity": number
}
```

#

to get summary add to url:

> /users/:username/summary

Path Parameters
● username (string)

## good luck
