const form = document.querySelector("form");
const showQuesAns =document.querySelector(".question")
const baseURL = "https://opentdb.com/api.php";


form.addEventListener("submit",fetchformData)

function fetchformData(e){
showQuesAns.innerHTML="Loading Data"

   e.preventDefault()
   const formData=new FormData(form)
   const dataplayer = Object.fromEntries(formData)

  const actualURL=`${baseURL}?${getQueryString(dataplayer)}`

//    const actualURL = `${baseURL}?amount=${dataplayer.amount}&category=${dataplayer.category}&difficulty=${dataplayer.difficulty}&type=${dataplayer.type}`
    //   console.log(actualURL)
   fetchData(actualURL)
}


function getQueryString(data){
   let querystring="";
   for(let x in data){
    querystring+=querystring.length===0 ?`${x}=${data[x]}`:`&${x}=${data[x]}`
   }
   return querystring
}

function fetchData (url){
    fetch(url)
    .then((response)=> response.json())
    .then((result)=> showData(result.results))
}


 function showData(data){
    showQuesAns.innerHTML=""
    const newData = data.map((obj)=>{
        obj.incorrect_answers.push(obj.correct_answer)
        return obj
    })
  
    let quesAns = document.createElement("div")
     quesAns.classList.add("quesAns")


    newData.forEach(obj => {
        const randomoptions =randomize(obj.incorrect_answers);

        const question= document.createElement("p")
        question.classList.add("question")
        question.innerText=obj.question;

        const options = document.createElement("div")
        options.classList.add("options")
        for (let i=0; i<4; i++){
            const option = document.createElement("p")
            option.classList.add("option")
            option.innerText=randomoptions[i]
            options.append(option)
        }
      
     quesAns.append(question,options)
     
     
    });
    
    showQuesAns.append(quesAns)

 }

   


 function randomize(arr){
      const randomvalue =[];
      for (let i=0 ; i<arr.length;i++){
        const value =arr[Math.floor(Math.random()*arr.length) ] 
        if (randomvalue.includes(value) )return randomize(arr)
            else{randomvalue.push(value)}
      }
      return randomvalue
 }