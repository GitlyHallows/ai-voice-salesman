I want to build a sales AI agent application in a web site on localhost. 

Go through @/sales-ai-agent/objective.md 

This app would be used by a sales associate to speak to the the AI agent in the form a always-on phone call. The phone call is available as a mic thats integrated with elevenlabs API. You can use @/audio-timer-tale/ code to understand how to build this. That repo did a similar integration with 11labs via a mic option at the bottom.


So basically as a first step for building @/sales-ai-agent/objective.md , I want you to focus on the mic part - where the sales agent asks the AI agent over call sometihng like "Sarah Tancredi is interested in buying something for interior designing in his home, suggest what in this store that are in stock might be of interest to them. " and then the 11labs conversation stream API would respond with things like "Sarah would like green tree designs as paintings, based on similar designs she bought for her clothes a month earlier". And then the sales agent would use this to speak to Sarah to show her the paintings in the store. And then the sales guy might then ask 'George is interested in buying clothes..." etc. The mic with sales guy will be always on but the AI agent would respond only when Sales guy asks something. 


As the 1st step, your task is to confine to building a web site in localhost that just lets the sales guy start the conversation with mic and asks info.


THe AI agent is supposed to have all the purchase history of all the customers(which would've been obtained when the customers uploaded their loyal card number and preferences on the app).

Design an implementation plan to build the above, for a coding agent to implement it. Lets start simple and then build step and step once basic things work. The mic should work.

Your code should be in sales-ai-agent repo, use audio-timer-tale folder for understanding and referencing.
