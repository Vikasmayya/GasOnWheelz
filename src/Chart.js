import { useState, useEffect } from "react";
import { firestore } from './Firebase';
import { BarChart } from "./BarChart";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

export default function ChartFunction() {
    // eslint-disable-next-line no-unused-vars
    const [chartData, setChartData] = useState([]);
  
    useEffect(() =>{
        const firebaseData = firestore.collection("Capital").doc("capital")
        .onSnapshot(doc =>{
            setChartData({
                labels:  ["12KG", "17KG", "19KG"],
                datasets: [
                  {
                    label: "Full ",
                    data: [doc.data().full_12KG,doc.data().full_17KG,doc.data().full_19KG],
                    backgroundColor: [
                      "#2752E7",
                    ],
                    borderColor: "transparent",
                    borderWidth: 1,
                    borderRadius: 10,
                  },
                  {
                    label: "Empty ",
                    data: [doc.data().empty_12KG,doc.data().empty_17KG,doc.data().empty_19KG],
                    backgroundColor: [
                      "#FF4F4F",
                    ],
                    borderWidth: 1,
                    borderRadius: 10,
                  }
                ]
              });
        });
        return () => firebaseData();
    }, []);

  return (
      <BarChart chartData={chartData} />
  );
}