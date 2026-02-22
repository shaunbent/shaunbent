---
layout: article.njk
title: "Design systems are platform problems, not feature problems"
date: 2026-02-23
description: "Where you put your design system team with your organisation determines how they think, what they build, and whether the system stays a platform or the teams become a UI feature factory."
category: "Lessons from Spotify"
# image: "./images/Hero.webp"
# imageAlt: "The outline of an iPhone with a notification highlighted. The message is someone called: 'Super Cool EM Friend' and reads: 'Oh my god! Check your email'"
unlisted: true
---

_I spent nine years at Spotify leading design systems and accessibility. During that time, I learned as much from what failed as from what succeeded. I'm sharing these insights not to critique decisions made at the time, but because I believe they're valuable and can help others navigate similar challenges. This article is part of a [series exploring those lessons](/lessons-from-spotify/)._

<!-- ![The outline of an iPhone with a notification highlighted. The message is someone called: 'Super Cool EM Friend' and reads: 'Oh my god! Check your email'](./images/Hero.webp) -->

When I published my piece on [leading through a design system reorg](https://www.shaunbent.co.uk/blog/when-the-decision-is-made-and-you-cant-change-it/), [Dave House](https://www.linkedin.com/posts/iknowdavehouse_a-design-system-reorg-tale-as-old-as-time-share-7429797760087982080-LhWl?utm_source=share&utm_medium=member_desktop&rcm=ACoAACKKGxkBIjSZ91zOEZDVIfQ8ZGbUHBa_f0A) highlighted this section:

> "Design systems are platform problems, not feature problems. By placing platform work within a feature organisation, you're fundamentally misaligning incentives and ways of working. Feature teams optimise for speed and shipping. Platform teams optimise for consistency, scalability, and long-term health. Those aren't compatible, and you can't just will them into compatibility by reorganising."

In [my reply to Dave](https://www.linkedin.com/feed/update/urn:li:activity:7429797760905760768?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7429797760905760768%2C7429830265855909888%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287429830265855909888%2Curn%3Ali%3Aactivity%3A7429797760905760768%29), I pointed to differences in planning cycles as a concrete example of how that tension shows up in practice. This article expands on that.

## Different functions, different rhythms
In his article, [Ship Faster by Building Design Systems Slower](https://bigmedium.com/ideas/design-system-pace-layers-slow-fast.html), Josh Clark argues that different parts of a product organisation should deliberately operate at different speeds. Feature teams move fast at the outer layer, experimenting, innovating and shipping. Design systems sit at the centre, moving slowly and deliberately. As Josh explains: 

> "Successful design systems move more slowly than the products they support. That's a feature, not a bug."

The relationship between the two layers is what makes it work. Feature teams innovate, and the design system curates and standardises proven patterns. "Fast learns, slow remembers."

One way organisations optimise for these different rhythms is through their planning processes.

## The planning cycle problem
Feature organisations design their planning processes to drive user value and deliver on high-impact, high-visibility company initiatives. That makes complete sense for them. When you place a design system team inside those same processes, the incentives shift immediately. 

When the team from my [previous article](https://www.shaunbent.co.uk/blog/when-the-decision-is-made-and-you-cant-change-it/) moved into the feature organisation, that department explicitly required each team to be actively contributing to at least one high-priority company initiative. For feature teams, that's a natural fit. For the design system team, it meant immediately deprioritising the broad, horizontal work they'd been doing and picking up short-term, feature-specific work instead. From macro to micro, overnight.

In practice, that means shifting from platform thinking, “_build component X because it serves multiple teams across multiple use cases_”, to bespoke UI development, “_build this specific thing because a specific team needs it_”. That's the transition into what I'd call a “UI feature factory”. The team is producing output, but they’ve stopped solving design system problems.

When the planning cycle consistently pushes your design system team from macro thinking to micro thinking, that misalignment compounds until the system stops functioning as a platform.

I saw this scenario play out three times at Spotify. Each time a design system team was placed within the same feature organisation, the same shift occurred, and the same outcome followed. The first time, I caught it early enough to course-correct. We moved the team into a platform organisation, and [Encore](https://www.shaunbent.co.uk/blog/reimagining-design-systems-at-spotify/) eventually grew from that. The [second time](https://www.shaunbent.co.uk/blog/why-federated-design-systems-keep-failing/), the consequences were severe enough that the team was disbanded entirely. The third time is the story I've been telling across these two articles.

These teams didn't fail because of the people. The people were great. The environment and the structure made the work impossible.

## Why platform organisations align better
A platform organisation has a fundamentally different mandate. Its customers are the teams building products, and its success is measured by how well it enables those teams rather than by the features it ships directly to end users.

That mandate fits naturally with what a design system needs to do. Josh describes the design system as "critical front-end infrastructure," and infrastructure needs the right conditions to operate well. A platform organisation provides those conditions, letting the design system move at its natural pace, thinking at the macro level, and serving the whole organisation rather than a single part of it.

In my experience, being inside a platform organisation gave us more freedom to largely set our own planning agenda and decide how we interacted with company priorities, without always being subordinate to them.

## It's not without its challenges
Platform organisations are not a perfect answer. Engineering-heavy organisations don't always have natural context for design systems work, and you can find yourself repeatedly explaining the value and complexity to leadership. 

The separation from product teams requires active relationship management. Without deliberately maintaining strong relationships with your customers, that distance becomes a liability, and you can end up building things nobody needs because you've lost sight of what product teams are focused on building.

These are real challenges, but you can work on them. The misalignment that comes from sitting in a feature organisation is structural and much harder to work around.

## Can feature organisations work?
Could I see a design system team operating successfully within a feature organisation? Absolutely, but it requires deliberate structural protection.

The team needs to be shielded from the delivery pressure that defines life in feature organisations. That means holding them to different planning expectations, not requiring them to attach to high-priority company initiatives in the same way feature teams are. It means protecting their ability to think at the macro level, to plan for broad impact across the organisation rather than solving one team's immediate problem.

In my experience, this can’t happen without leaders who genuinely understand how design system teams need to operate. Without that understanding, the path of least resistance is to treat them like any other team in the department, and that's where the problems start.

Without those conditions explicitly in place, the gravitational pull of the feature organisation takes over. The planning processes, the metrics, and the incentives all point in the same direction. And over time, the design system team follows.

## Positioning is a strategic decision
Where your design system team sits deserves deliberate thought, not an arbitrary decision based on available headcount.

I believe design systems are infrastructure. They exist to serve multiple teams across multiple use cases, to solve common problems once rather than many times, and to raise the quality and consistency of multiple experiences. That work requires a planning horizon, a mandate and an environment that feature organisations are generally not set up to provide.

If you're making this decision, or if it's already been made for you, it's worth being honest about what the structure you're operating in is asking your team to optimise for. Because eventually, the structure wins.
