# Find Art
This is a wbsite for people who want to share and get some artworks' information.
This is also the final project for info6250.
## Extra Credits
+ Pagination
+ Register page
+ Different levels of authorization( please enter 'admin' when you want to login as an administrator)
+ UI interactions that require state management
+ The use of useReducer

## Introductions
### Home
+ This website is open, so users can access the homepage without logging in.
+ The components displayed in the top bar are determined by the login status.
 + If the user is not logged in, clicking the Post button will redirect them to the login page with a prompt indicating that login is required to use this feature.
 + If the logged-in role is a user, they are allowed to access the Post page.
 + If the logged-in role is an administrator, an additional Manage button will appear in the top bar. Clicking it will verify the authorization information to ensure that only administrators can access the management page.
+ The banner is set to autoplay.
+ Clicking on any image will redirect to its corresponding artwork details page.
+ Clicking the Explore More button or the Gallery button will redirect to the artwork gallery.
+ The images in the Editor's Pick section can be paged through.
+ The logo on all pages is clickable and will redirect to the homepage.

### Login and Register
+ "Yiwen", "Draco", "admin" are already in the user list, they could login directly.
+ An unfamiliar username must be registered first.
+ Duplicate usernames are not allowed during registration.


### Gallery
+ When no category tags are selected, all artworks are displayed. Once one or more tags are selected, the artworks that match any of the selected tags will be displayed as filter criteria.
+ Could paginate through the gallery.
+ Could can choose the sorting method for the artworks.
### Artwork Introduction 
+ Could select or deselect the red heart below the image to achieve a like effect.(For logged-in users only.)
+ The Back button helps users return to the homepage, but it does not maintain the current front-end state.

### Post (logged0in users only)
+ Users must fill in or check all required fields before successfully publishing.
+ Before publishing, the server will check the current session status.
+ The server processes the received data to prevent XSS attacks when storing or displaying it.

### Manage (admin only)
+ By selecting multiple artworks, they will be added as new data for the Editor's Pick.

## Copyright Notice
All artworks featured in this project are public domain, and the images are sourced from Wikiart.