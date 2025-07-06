# Web Development Project 4 - Discover Cats

Submitted by: **Your Name Here**

This web app: **A React application that fetches random cat breeds from The Cat API, displays detailed information about each cat including breed, temperament, origin, and personality ratings. Users can click on attributes to ban certain breeds or characteristics, preventing them from appearing in future discoveries. The app also maintains a history of previously discovered cats.**

Time spent: **X** hours spent in total

## Required Features

The following **required** functionality is completed: 

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - The "Discover Cat" button fetches random cats from The Cat API
  - Displays breed, temperament, origin, life span, and weight consistently across all API calls
  - Shows a beautiful cat image with every result
- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - A single cat result is displayed at a time 
  - Displayed attributes match the displayed image (breed, temperament, origin all correspond to the shown cat)
  - There is exactly one image per API call
- [x] **API call response results should appear random to the user**
  - Clicking the "Discover Cat" button generates a seemingly random new cat each time
  - Uses The Cat API which has a large database of cat breeds, making repeats infrequent
- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
  - Breed, temperament, and origin attributes are all clickable
  - Clicking on a clickable attribute not on the ban list immediately adds it to the ban list 
  - Clicking on an attribute in the ban list immediately removes it from the ban list 
- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - Clicking the "Discover Cat" button does not result in any cats with banned attributes being displayed
  - If a cat with banned attributes is fetched, the app automatically fetches another cat
  - More banned attributes may result in higher frequency of repeat results as expected

The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list
  - Breed, temperament, and origin are all clickable and ban-able
- [x] Users can see a stored history of their previously displayed results from this session
  - A dedicated "Discovery History" section displays all previous cats seen
  - Each time the API call button is clicked, the history updates with the newest cat
  - History shows the last 10 discovered cats with images and breed names
  - Users can clear the history with a "Clear History" button

The following **additional** features are implemented:

* [x] **Comprehensive Cat Ratings**: Displays 12 different personality and care ratings (intelligence, adaptability, affection level, etc.) using star ratings
* [x] **API Key Integration**: Enhanced functionality when using a Cat API key for better access and more detailed information
* [x] **Responsive Design**: Modern, beautiful UI that works on desktop, tablet, and mobile devices
* [x] **Loading States**: Shows "Discovering..." text while fetching new cats
* [x] **Error Handling**: Displays user-friendly error messages if API calls fail
* [x] **Visual Feedback**: Clear indication of banned vs clickable attributes with strikethrough styling
* [x] **Automatic Ban Checking**: Prevents banned cats from being displayed by checking attributes before showing results

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.

## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
