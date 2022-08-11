# Third reevaluation of the assignment
I am once again glad to be here and grateful for the attention and time you put in guiding me through this journey, thank you so much.
## feedback/ learning points about your submission:

**Don't fetch all products for all categories. Fetch products for the current category only.**

Getting this to work was more challenging than I anticipated. I had to improve and edit the architecture of the logic handling API calls and I did so in a matter that is scalable. If in the future we add more categories or products, the same code will work (case this was an IRL project).

## previous readme.md 
# My second attempt at the assignment and what I learned
Before I begin, I would like to thank you once more. This time for pointing out the shortcomings of my previous attempt at the assignment, pushing me towards the best coding practices, giving me the chance to be here again and taking the time to review this project once more, I really appreciate it. I hope that I have addressed the issues pointed in your review appropriately. Anyhow, this whole experience has broadened my prospects as a developer.

## feedback/ learning points about my submission:

**1- Please remove custom scrollbars and don't crop the page content.**

I removed all scrollbars from the PDP where i made the content no longer cropped aswell. It was one of the aspects not addressed in the design where you had to figure out what would happen when you have multiple images or a long product description. looking at my solution in retrospect, it wasn't really good. I've only used one custom scrollbar throughout the app that is in the cart overlay.

**2- Please don't redirect the page when product is added to the cart.**

No longer the case.

**3- Some product description HTML styles are reset, like heading tag styles.**

I did not notice this in my original attempt. Product description HTML now retain their default styles.

**4- Please remove arrows if there is only one image.**

My original approach was to make the arrows disabled with the visual cue being to set them at half the opacity, but removing them completely is indeed better.

**5- When I reload the Tech page, I want to stay on that page.**

I used URL params to achieve this.

**6- You are fetching the same data multiple times! Please investigate your network requests and remove unnecessary API calls.**

I have to admit that I have not been paying attention to a critical developer tool that is the network tab. There was some embarrassing amount of overfetching going on in the background which defeats the whole purpose of using graphql. I made sure to remove all instances of unnecessary API calls and I also disabled React Strictmode to make things clearer over at the network tab. (When React strictmode is enabled, API requests appear to be duplicated)

**7- Please don't fetch the product list for categories on PDP.**

I also addressed this issue same as the latter when overhauling how API calls are made in the app.

**8- Please don't use the style prop with constant values. Move such styles to CSS.**

This was a bad practice, i moved all static styles to the CSS.

**9- dangerouslySetInnerHTML is dangerous. Please try to find a safer way.**

This has opened my eyes to a whole new set of security concerns mainly XSS attacks. After doing the necessary research, i decided to deal with this issue by using a package called <a href="https://github.com/cure53/DOMPurify" target="_blank">DOMPurify</a>
. It cleanses the product description from anything possibly malicious embedded into its HTML before inserting it into the DOM. I'm curious on how the team over at Scandiweb handles these concerns. Also, here's a video i found to be both entertaining and educational on the matter <a href="https://www.youtube.com/watch?v=2GtbY1XWGlQ&t=206s" target="_blank">This is why you sanitize user input: Chat hacked live by XSS/HTML code injection.</a>

**10- Please reduce the gap between the products on the Clothes page.**

Done!

## previous readme.md 

# Moussa Sahli's test project for the application to Scandiweb's React.js Developer position 
* first of all, thank you for considering me for this position, giving me the chance to have this experience and for taking the time to review this project and mentor me. No matter what your final decision would be, I will come out a winner at the end of it all by improving as a web developer.

# About the project
* This Web-App is best optimised for a 1920x1080 resolution tough it will work on all PC grade screen sizes, when using resolutions as in the Figma design it will match the latter perfectly. 
* I used react-router-dom to have an SPA, redux toolkit to manage the state and I chose graphql-request as my graphql client, lightweight and convenient for this project.
* I used react-dom-router@5 instead of @6 due to v6's compatibility issues with class based components.
* The app's state will not be preserved throughout page reloads, my reasoning behind this is that if i wanted to maintain the state I would probably resort to using LocalStorage for this project which will not prove anything and is not the approach I'd take in a real project. It would only unnecessarily over-engineer the app. 
* When clicking on the green add to cart button on the PLP, it will only add the product to the cart if it has no attributes else it will redirect you to PDP where you have to select its attributes. (this was one of the suggested solutions in the Q&A section)
* Graphql server must be hosted on port 4000 for the app to work. 
* It took me around a week to finish this project.

