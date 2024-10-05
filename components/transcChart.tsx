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

import { Transaction } from "@/app/page";
import { Container } from "react-bootstrap";

interface Prop {
    transcProp: Transaction[];
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
//sum up the amounts of the same type
function combineType(transc: Transaction[]) {
    const typeMap = new Map<string, number>(); // create a map for each type, that sums up the amount if it qualifies as the same type
    transc.forEach((t) => {
        if (typeMap.has(t.type)) {
            typeMap.set(t.type, typeMap.get(t.type)! + Number(t.amt));
        } else {
            typeMap.set(t.type, Number(t.amt));
        }
    });
    return Array.from(typeMap).map(([type, amt]) => ({ type, amt }));
}

export default function TranscChart({ transcProp }: Prop) {
    const combinedData = combineType(transcProp); // Get the combined data

    return (
        <Container className="transcs p-3 ">
            <h2><b>Price per Type</b></h2>
            <Bar style={{ marginTop: "50px" }}
                data={{
                    labels: combinedData.map((t) => t.type),
                    datasets: [
                        {
                            label: "Amount",
                            data: combinedData.map((t) => t.amt), // Use combined amounts
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
        </Container>
    );
}