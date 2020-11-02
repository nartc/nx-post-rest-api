# PostRest API

This project was generated using [Nx](https://nx.dev).

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

This is a RestAPI clone of [Beeman's PANNG demo](https://github.com/beeman/panng-stack)

## Prerequisite

- MongoDB setup with Docker, should be running on port 27017
- (Optional) This project is using [NSwag](https://github.com/RicoSuter/NSwag) for client code generation. To run NSwag, you'd need [dotnet](https://dotnet.microsoft.com/)

## Quick start

- Clone this repo
- `npm install`
- `npm run start -- api` to start the API
- `npm run start` to start the Web frontend

## Quick links

- [Frontend](http://localhost:4200)
- [API](http://localhost:8080)
- [SwaggerUI](http://localhost:8080/api/docs)

## Available commands

- `npm run nswag`: this is to generate Client code that contains all methods targeting all endpoints exposed on SwaggerUI

## RxAngular

This project utilizes [rx-angular](https://rx-angular.github.io/rx-angular/) on the Angular side. This allows for easy and light-weight state management solution (very suitable for a demo application like this)

RxAngular also allows for a 100% subscribe-less **reactive** Angular application with `hold()` and `connect()`. Feel free to check out the `**-state.service.ts` to see how `RxAngular` is being implemented in this application.

## AutoMapper

This project is also to demo [AutoMapper in TypeScript](https://github.com/nartc/mapper). Check out the `mappings` and `dtos` directories in the `api` libs to see how `AutoMapper` is being implemented in this application.  

## Improvement

Of course, this demo isn't perfect so there are a lot of improvements to be made like error handling and loading spinners etc...

One of the things to improve on is to separate the **triggers** and the **effects** in `PostService`. What are **triggers** and **effects**?

- triggers: Think of these as **Actions**
- effects: API calls

`connect()` and `hold()` APIs from `RxAngular` expect `Observable` so we need to have **triggers** to be able to execute actions then pipe to the actual API calls, aka **effects**. 
