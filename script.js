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
      console.log(actualURL)
   fetchData(actualURL)  // fetchdata is function
}
               
function getQueryString(data){   // datapalyer is convert is data 
   let querystring="";
   for(let x in data){         // data is a object then object loop is for in  
    querystring+= querystring.length===0 ?`${x}=${data[x]}`:`&${x}=${data[x]}`
    // if querystring===0 hai to ${x}=${data.x} and (nhi to) &${x}=${data.x}
                     // data is key value so x is key and data.x is value
   }
   return querystring
}
     // fetchdata (acturalURL) is convert (url)  
function fetchData (url){
    fetch(url)
    .then((response)=> response.json()) // url in object formet 
    .then((result)=> showData(result.results)) // url convert in tree array of object format json () read easy 
}


       // url array of object format read easily to convert to data 
 function showData(data){  
    showQuesAns.innerHTML=""
                    // data in 30 item to har ek pe (.map())
    const newData = data.map((obj)=>{ obj.incorrect_answers.push(obj.correct_answer)
        return obj   // har ek obj ki incorct answer me correct answer push kr do
    })
  
    let quesAns = document.createElement("div")
     quesAns.classList.add("quesAns")


    newData.forEach(obj => {
        const randomoptions =randomize(obj.incorrect_answers);

        const question= document.createElement("p")
        question.classList.add("questions")
        question.innerText=`Ques.  ${obj.question}`;
        

        const optionDIv = document.createElement("div")
        const options = document.createElement("ul")
        optionDIv.classList.add("optiondiv")
        for (let i=0; i<4; i++){
            const option = document.createElement("li")
            option.classList.add("option")
            option.innerText=randomoptions[i]
            options.append(option)
            optionDIv.append(options)
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


//  let a=10;
//   let b=5;

//   a=a+b // 15
//   b=a-b //10
//   a=a-b //5
