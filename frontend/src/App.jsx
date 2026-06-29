import { useState, useEffect } from "react";
import "./App.css";


function App() {

  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);



  const getReports = async () => {

    try {

      const response = await fetch(
        "https://seo-analyzer-gikv.onrender.com/api/reports"
      );

      const data = await response.json();

      setReports(data.reports || []);

    } catch (error) {

      console.log("Reports error");

    }

  };




  const analyzeWebsite = async () => {


    if (!url) {

      alert("Please enter website URL");

      return;

    }



    try {


      setLoading(true);



      const response = await fetch(

        "https://seo-analyzer-gikv.onrender.com/api/reports",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            url

          })

        }

      );



      const data = await response.json();



      if (!data.success) {

        alert(data.message);

        return;

      }



      setResult(data);


      getReports();



    } catch (error) {


      alert("Backend server is not running");


    } finally {


      setLoading(false);


    }


  };





  useEffect(() => {

    getReports();

  }, []);





  return (

    <div className="container">


      <h1>🚀 SEO Analyzer</h1>



      <input

        placeholder="Enter website URL"

        value={url}

        onChange={(e)=>setUrl(e.target.value)}

      />



      <button onClick={analyzeWebsite}>


        {loading ? "Analyzing..." : "Analyze"}


      </button>





      {loading && (

        <h3>⏳ Please wait, checking SEO...</h3>

      )}






      {result && (


        <div className="result">


          <h2>SEO Report</h2>



          <div className="cards">



            <div className="card">

              <h3>SEO Score</h3>

              <p>{result.score}%</p>

            </div>




            <div className="card">

              <h3>Performance</h3>

              <p>{result.lighthouse.performance}%</p>

            </div>





            <div className="card">

              <h3>Accessibility</h3>

              <p>{result.lighthouse.accessibility}%</p>

            </div>





            <div className="card">

              <h3>Best Practices</h3>

              <p>{result.lighthouse.bestPractices}%</p>

            </div>



          </div>






          <h3>Page Details</h3>


          <p>
            Title: {result.seo.title}
          </p>


          <p>
            Meta Description: {result.seo.metaDescription}
          </p>


          <p>
            Images: {result.seo.images}
          </p>



        </div>


      )}







      <h2>Previous Reports</h2>




      <div className="history">


      {

        reports.map((item)=>(


          <div 
            className="historyCard" 
            key={item._id}
          >


            <p>
              🌐 {item.url}
            </p>


            <p>
              Score: {item.score}
            </p>


          </div>


        ))

      }


      </div>





    </div>

  );

}


export default App;
