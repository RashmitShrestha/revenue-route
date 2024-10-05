import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { CompanyDataInterface } from "./nextsteps";

interface Prop {
    stockPrices: CompanyDataInterface[];
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function CompCharts({ stockPrices }: Prop) {
    return (
        <div>
            <h1>Stock Price</h1>
            <Bar
                data={{
                    labels: stockPrices.map((company) => company.companyName),
                    datasets: [
                        {
                            label: "Stock Price",
                            data: stockPrices.map((company) => company.price),
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "rgb(75, 192, 192)",
                            borderWidth: 1,
                        },
                    ],
                }}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true, // Start Y-axis at zero
                        },
                    },
                }}
            />
        </div>
    );
}
