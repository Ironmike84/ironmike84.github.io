MOVIE API
==================================================================================================================================================================================
The Movie API Call creates a server Request and imports the HTTP module and returns the URL Module Index File. If user adds documentation to localHost:3000/documentation the user will be handed the documentation file.

UPDATE: 12/14/21
<hr>
The Movie API Utilizes express in Node.js to get the documentation file for the Project directory. Further express.static was utilized to carry out the request. To get the documentation file from the project directory folder. Also A "/Movies" get request was added to the lifecycle.

Movie API will:
- Provide Access to a Database of Movies
- Search and find Details about movies (such as Titles directors, genres.)
- Users can create thier own account add personal information.
- Create a list of their favorite movies.
- Users Can Delete Movies Also from their list.
- Users Can Update Their personal Information
- Users Can De-Register their Account

<hr>
MJG 2021

<table>
  <tr>
    <th>Request:</th>
    <th>Endpoint:</th>
    <th>Method:</th>
    <th>Format</th>
    <th>Description<th>
  </tr>
  <tr>
    <td>All Movies</td>
    <td>/Movies</td>
    <td>GET</td>
    <td>JSON Format</td>
    <td>Gets All Movies</td>
  </tr>
  
  <tr>
    <td>One Movie</td>
    <td>/Movies[id]</td>
    <td>GET</td>
    <td>JSON Format</td>
    <td>Returns a Single Movie</td>
   </tr>

  <tr>
    <td>Find Actor</td>
    <td>/Movies[actors][id]</td>
    <td>GET</td>
    <td>JSON Format</td>
    <td>Returns a Single Actor</td>
  </tr>
  
  <tr>
    <td>Find Genre</td>
    <td>/Movies[genres]</td>
    <td>GET</td>
    <td>JSON Format</td>
    <td>Returns All Movie Genres</td>
  </tr>
  
  <tr>
    <td>Find Actor Details</td>
    <td>/Movies[actors][id][bio]</td>
    <td>GET</td>
    <td>JSON Format</td>
    <td>Returns data about each actors Bio Data Birth Year Death year and Movies Played</td>
  </tr>
  
  <tr>
    <td>Add Favorite Actor</td>
    <td>/Movies[actors][id][favorites][actors]</td>
    <td>POST</td>
    <td>JSON Format</td>
    <td>Adds Users Favorite Actor to their list</td>
  </tr>
  
  <tr>
    <td>Add Favorite Movie</td>
    <td>/Movies[id][favorites][movies]</td>
    <td>POST</td>
    <td>JSON Format</td>
    <td>Adds Favorite Movie to their list</td>
  </tr>
  
  <tr>
    <td>Remove Favorite Actor</td>
    <td>/Movies[favorites][actors]</td>
    <td>DELETE</td>
    <td>JSON Format</td>
    <td>Removes favorite Actor from Users list</td>
  </tr>
 
 <tr>
    <td>Delete Favorite Movie</td>
    <td>/Movies[favorites][movies]</td>
    <td>DELETE</td>
    <td>JSON Format</td>
    <td>Removes favorite Movie from Users list</td>
  </tr>

