---
title: "AWS EventBridge and Asynchronous Processes"
date: 2023-01-29
---
![Werner Vogels’ keynote from AWS re:Invent 2022](./images/2023-01-29-AWS_EventBridge_and_Asynchronous_Processes/title.png)

# AWS EventBridge and Asynchronous Processes
AWS re:Invent finished its 10th anniversary this past November, revealing the new services, applications, and innovations emerging from the online cloud giant. And while I was watching each of the keynotes and workshops (available on Youtube!), the central theme of the conference was pretty cut-and-dry: asynchronicity. In fact, Werner Vogels, the vice president and CTO of AWS, mentioned this theme several times in his [keynote](https://www.youtube.com/watch?v=RfvL_423a-I&t=1690s). It's pretty obvious that with every new service that AWS releases, there is a lot of thought given to paving the way for loosely coupled, fault-tolerant, and scalable applications. But, especially in the past year, the company seems to be moving towards the notion of __event-driven architectures__.

## What is an event-driven architecture?
Let’s take a quick and simple example, like an ordering system.

![Synchronous Order Payment System](./images/2023-01-29-AWS_EventBridge_and_Asynchronous_Processes/1.png)
<!-- *Synchronous Order Payment System* -->

In the diagram above, everything is __synchronous__. That means after the user orders a product, every service has to trigger the next. And while this is fine for smaller systems, synchronous processes are susceptible to failures. For example, imagine if the Payment API failed. Since it’s tightly coupled in a synchronous process, this means the entire process fails without a clean way to recover. Okay, maybe there aren’t that many possible failures. Why would a synchronous program be damaging? Well, if we wanted to add a new service, such as a service that checks whether there is any product left to ship, we would have to rework the entire system just to fit our new microservice in. If this same system had a hundred services, adding to a synchronous process would be a nightmare, let alone testing that service. That’s where asynchronous processes shine, like the one below.

![Asynchronous Order Payment System](./_images/2023-01-29-AWS_EventBridge_and_Asynchronous_Processes/2.png "Testing")
<!-- *Asynchronous Order Payment System* -->

Now, services work on a call-and-response system, and making changes to the overall system is much easier to implement. Instead of bundling the payment service, invoice processes, and whatever else, everything is abstracted as events. When our system hears that an order has been processed, it kicks off the invoice processing and payment API. Now, if the payment API goes down, the failure won’t bring down the entire system, and can be handled separately. Moreover, adding a new service becomes extremely simple. All you need to do is add a new event that handles the new service. That’s the idea behind event-driven architecture.

__TL;DR__: Event-driven architecture is an application that is reactionary rather than scheduled. You’re building architecture that can improvise and adapt to the real-world, without having to create workarounds for every possible issue.

---

## Amazon EventBridge: The path for event-driven
Amazon EventBridge is the AWS method for creating these event-driven architectures. This service is a __“serverless event router”__ that ingests __events__ through __rules__ and directs them to __targets__. EventBridge consists of pipelines called __event buses__; events are evaluated against the specific rules associated with the event bus. Alright, that’s a lot of technical terms, so let’s take a look at each one in detal.

### Events
In the AWS EventBridge documentation, an event is defined as 

> “a change in an environment such as an AWS environment, a SaaS partner service or application, or one of your applications or services.”

- A `PutObject` call on an S3 bucket
- An Auto Scaling group launches or terminates EC2 Instances
- An Amazon RDS DB instance status changes from `pending` to `running`
- A ticket request from Zendesk (an AWS SaaS partner)

These are just a couple of examples, but there are so many events that AWS defines, all with different fields of data. For any state transition, or addition of data, or API invocation — or really any change that you can imagine within AWS — it’s pretty likely that it emits an event.

Events are sent as JSON messages with some associated metadata and details specific to the event. What the means is that the event details could vary vastly between two different __event sources__, meaning it’s important to know what the event looks like before using it.

### Rules
Rules act as the road for events to travel. They listen for events, based on the event pattern, and sends the event to a specified target for processing. An event pattern is just the pattern that an event has to follow to trigger the rule, but we’ll talk more about that later. When an event pattern is matched, the rule sends the JSON message of an event to the target(s).
Rules can also be run on a schedule as well. They can be run at every fixed interval (e.g. every 5 minutes) or on a determined schedule (e.g. 5 PM UTC Monday through Friday). This also means there is no event pattern associated with scheduled rules.

### Event Patterns
Every rule on an event bus has an event pattern. If the event pattern matches exactly to the incoming event, then the event is sent to the target. Otherwise it’s ignored. Event patterns match to events from an event source; they can match to all events from that event source, or go through content-filtering.

![Example of content-filtering in Amazon EventBridge](./images/2023-01-29-AWS_EventBridge_and_Asynchronous_Processes/3.png)
<!-- *Example of content-filtering in Amazon EventBridge* -->

Content-filtering is a powerful tool that allows rules to only allow a specific subset of events through. For example, imagine a DynamoDB table consisting of credit card transactions. To prevent fraud, transactions must be approved if they are outside the user’s state of residence (Indiana) and above 300 dollars. This is exactly where content-filtering would come in.
Using the numeric operator, the rule can filter out any event where the “purchase” > 300.
Using the prefix operator, the rule can filter out events where the “location” prefix is not “IN”
Thus, the specific events can be sent to a target for processing.

### Targets
The last step of an event process is the target. There are multitude of targets, including many AWS services, SaaS applications, and APIs. However, there are two types of targets. The first type is where the event JSON is received and processed, such as Kinesis Data Streams or a Lambda function. The second type treats the event solely as a trigger. This is used for API gateway, external APIs, EC2 Image Builder, and more. The full list of targets can be found [here](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html).


Let’s put it all together. Looking at the diagram below, you should be able to understand what’s going on now.

![EventBridge Process](./images/2023-01-29-AWS_EventBridge_and_Asynchronous_Processes/4.png)
<!-- *EventBridge Process* -->

There’s an __event__ that is being injested by multiple different __event buses__. Each of these event buses has their own set of __rules__, each defining their own __event pattern__. After filtering and matching the event, the rules send the event to their __targets__ for processing, whether that be an AWS target, or a SaaS partner application.

---

## When is EventBridge used?
Now that you know how EventBridge works, naturally, you should be asking: When should I use it? Well, as we discussed previously, this service is best used when building asynchronous architectures where there are many processes occurring at once, such as the Order Payment system we discussed.

That being said, it’s still possible to build asynchronous architectures without a service such as EventBridge; it’s what companies have been doing for years. With all of AWS’s serverless options, such as Lambda, Fargate, API Gateway, S3, and more, asynchronous services are easy to create on a smaller scale. For example, Lambda provides triggers and destinations, and it still functions as an asynchronous process. And before EventBridge, a developer could use SQS and SNS to fan out and trigger other services. However, once your system starts to grow, these independent processes and single-purpose services become hard to keep track of. When you have a separate trigger for your Payment API, messaging service, order processor, and invoice processor, the architecture can become complicated.
An event-driven architecture through EventBridge is a much simpler solution.

---

### Wait, we’re not done yet! 
Amazon EventBridge also provides some extra functionality for users.

### Schema Registry
A schema defines the structure and content of an event published on to an event bus, i.e. the event pattern of events. In EventBridge, schemas are used to specify what an event should look like when passed in. EventBridge’s schema registry provides several pre-written schemas for common event patterns (who’s code bindings can be downloaded).

> “You can also create or upload custom schemas or infer schemas directly from events on an event bus.”

That’s right! EventBridge can also infer schemas from an event bus. This can be a really powerful tool when you’re not sure what the event pattern looks like. For example, if an API is sending events to an event bus, you may not always know what that event would look like. EventBridge will create a schema for that event that can then be downloaded or reused for other rules.

### EventBridge Scheduler
EventBridge Scheduler is a serverless task management system, allowing users to create, run, and manage tasks at scale. This service provide at-least-once event delivery to its targets, meaning if an event delivery encouters an error, it will retry the task (as outlined by the user).

One specific part of EventBridge Scheduler is the ability to archive and replay events. By specifying an event pattern, EventBridge will archive any event that matches the pattern and allow it to be replayed later, to recover from errors or to test new functionality in an application.

### EventBridge Pipes
I could write a whole other post on Pipes, but the motivation behind this serverless service comes from previously having to right clunky code to manipulate events before they reach the target. Moreover, the service handles multiple events that may trigger the same target.

EventBridge Pipes allows you to filter events from event — kind of like content-filtering, but on a more granular level. Instead of having to implement a filter for every rule, Pipes allows one main filter that sends a subset of events for processing. In addition, this service allows event enrichment with Lambda, Step Functions, or an API. This could be adding extra data into the event or transforming the event itself.

Dr. Vogels introduced this service in his November 2022 keynote with the overarching idea:

> “With Amazon EventBridge Pipes, you can integrate supported AWS and self-managed services as event producers and event consumers into your application in a simple, reliable, consistent and cost-effective way.”

The important thing to note is that EventBridge Pipes don’t work on all events, only event streams. That includes DynamoDB streams, SQS, Kinesis Data Streams, and more. If you need to filter these events in real-time and manipulate the data, EventBridge Pipes is the perfect service.

---

Asynchronous processes are the solution for architecture in the future. The benefits of fault-tolerance and ease of restructuring cannot be underscored. And with AWS EventBridge, that task becomes trivial, and event-driven architectures are more possible than ever.
