    <h1>MOVIE REST API</h1>
<hr>
<p>The Movie API Call creates a server Request and imports the HTTP module and returns the URL Module Index File. 
If user adds documentation to localHost:3000/documentation the user will be handed the documentation file.</p>

UPDATE: 12/14/21<br>
<hr>
<p>The Movie API Utilizes express in Node.js to get the documentation file for the Project directory. Further
    express.static was utilized to carry out the request. To get the documentation file from the project directory folder.
    Also A "/Movies"  get request was added to the lifecycle.
</p>

<ul><strong>Movie API will:</strong>
    <li>Provide Access to a Database of Movies</li>
    <li> Search and find Details about movies 
    (such as Titles directors, genres.) </li>
    <li>Users can create thier own account
    add personal information.</li>
    <li>Create a list of their favorite movies.</li>
    <li> Users Can Delete Movies Also from their list.</li>
    <li> Users Can Update Their personal Information</li>
    <li>Users Can De-Register their Account</li>
 </ul>
<hr>
<br>
MOVIE REST API ENDPOINTS:
<hr>

<table style="text-align:center">
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
    <td>/Movies</td>
    <td>GET</td>
    <td>JSON Format</td>
    <td>Returns a Single Movie</td>
   </tr>

  <tr>
    <td>Find Genre</td>
    <td>/Movies/Genres</td>
    <td>GET</td>
    <td>JSON Format</td>
    <td>Returns All Movie Genres</td>
  </tr>

  <tr>
    <td>Add Favorite Movie</td>
    <td>/movies/favMovies/:Title</td>
    <td>POST</td>
    <td>JSON Format</td>
    <td>Adds Favorite Movie to their list</td>
  </tr>

 <tr>
    <td>Delete Favorite Movie</td>
    <td>/movies/remove/:Title</td>
    <td>DELETE</td>
    <td>JSON Format</td>
    <td>Removes Favorite Movie from Users list</td>
  </tr>
  <tr>
    <td>Add User</td>
    <td>/users/NewUser/:UserName</td>
    <td>POST</td>
    <td>JSON Format</td>
    <td>Creates New User</td>
  </tr>

  <tr>
    <td>Update User</td>
    <td>/users/UpdateUser/:Username</td>
    <td>PUT</td>
    <td>JSON Format</td>
    <td>Updates User Information</td>
  </tr>

  <tr>
    <td>Delete User</td>
    <td>/users/remove/:UserName</td>
    <td>DELETE</td>
    <td>JSON Format</td>
    <td>Removes User from Users list</td>
  </tr>
  </table>



MJG 2021
