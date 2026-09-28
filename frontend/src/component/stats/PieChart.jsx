
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { todoList } from "../../localData/todoList";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const PieChart = () => {
    // Calculate status counts from todoList
    const pending = todoList.filter(
        (item) => item.status === "Pending"
    ).length;

    const inProgress = todoList.filter(
        (item) => item.status === "In Progress"
    ).length;

    const completed = todoList.filter(
        (item) => item.status === "Completed"
    ).length;

    const data = {
        labels: ["Pending", "In Progress", "Completed"],
        datasets: [
            {
                data: [pending, inProgress, completed],
                backgroundColor: [
                    "#dc2626",
                    "#3b82f6",
                    "#16a34a",
                ],
                borderWidth: 0,
                hoverOffset: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 13,
                    },
                },
            },

            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw;
                        const total = context.dataset.data.reduce(
                            (sum, value) => sum + value,
                            0
                        );

                        const percentage = (
                            (value / total) *
                            100
                        ).toFixed(1);

                        return ` ${value} tasks (${percentage}%)`;
                    },
                },
            },
        },

        cutout: "65%",
    };

    return (
        <div className="w-full">

            <div className="relative h-64 w-full">
                <Doughnut
                    data={data}
                    options={options}
                />
            </div>
        </div>
    );
};

export default PieChart;
