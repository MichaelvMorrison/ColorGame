let table;

function sortScores(scores){
  return scores;
}

function formatDate(date){
  return date.split(" ")[1] + " " + date.split(" ")[2] + ", " + date.split(" ")[3];
}

function populateLeaderboard(scores){
  scores = sortScores(scores);
  for(let i in scores){
    let score = scores[i];
    table.row.add([score.score,score.name,formatDate(score.date)]).draw(false);
  }
}

$(document).ready(function(){

  table = $('#leaderboard').DataTable({
    "bPaginate": false,
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
    "bAutoWidth": false,
    "order": [[ 0, "desc" ]]
  });

  $.ajax({
    url: "/leaderboard",
    type: "GET",
    success: function(data){
      if(data == "failed"){
        alert("Error getting scores from database.")
      }else{
        populateLeaderboard(data);
      }
    },
    error: function(err){
      console.log(err);
    }
  })

});
