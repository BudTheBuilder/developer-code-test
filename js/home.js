

function readFile()
{
    var sourceFile = new XMLHttpRequest();
    sourceFile.open("GET", "output.txt", false);
    sourceFile.onreadystatechange = function ()
    {
        if(sourceFile.readyState === 4)
        {

            if(sourceFile.status === 200 || sourceFile.status == 0)
            {
                var allText = sourceFile.responseText;
                var objects = JSON.parse(allText);
                for(var i = 0; i < objects.length; i++) {
                	//Create the container div for each artwork
                	var artContainer = document.createElement("div");
                	artContainer.classList.add("artContainer");
                	artContainer.classList.add("carousel-item")
                	//Create elements for each piece of info about artwork
                	var artTitle = document.createElement("h3");
                	artTitle.innerHTML = objects[i].title;
                	var artDept = document.createElement("h5");
                	artDept.innerHTML = objects[i].department_name;
                	var artTombstone = document.createElement("p");
                	artTombstone.innerHTML = objects[i].tombstone;
                	var artImage = document.createElement("img");
                	artImage.setAttribute("src", "images/" + objects[i].accession_number + "_reduced.jpg");
                	artContainer.appendChild(artImage);
                	var info = document.createElement("p");
                	info.classList.add("text");
                	info.append(artTitle);
                	info.append(artDept);
                	info.append(artTombstone);
                	artContainer.append(info);

                	$(".carousel-inner").append(artContainer);
                }
                $(".carousel-item").first().addClass("active");
                $(".carousel").carousel({interval: false});
            }
        }
    }
    sourceFile.send(null);
}