import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../services/firebase";
import GaugeChart from "./GaugeChart";

const EnergyMeter = () => {
  const [data, setData] = useState({
    Vrms: 0,
    Irms: 0,
    Power: 0,
    kWh: 0,
  });

  useEffect(() => {
    const energyRef = ref(database, "/EnergyMeter");
    onValue(energyRef, (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) setData(fetchedData);
    });
  }, []);

  const conversionRate = 14; // Rate per kWh for cost calculation
  const cost = (data.kWh * conversionRate).toFixed(2);

  return (
    <div className="p-8 bg-gray-100 min-h-scrceen">
      <h2 className="text-3xl font-bold text-center mb-8">
        Energy Monitoring Dashboard
      </h2>

      {/* Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg p-6 rounded-md">
          <GaugeChart
            value={data.Irms}
            maxValue={0.50}
            label="Irms (Ampere)"
            color="#1E88E5"
          />
          <p className="text-center text-2xl font-bold mt-4">{data.Irms.toFixed(2)} A</p>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-md">
          <GaugeChart
            value={data.Vrms}
            maxValue={250}
            label="Vrms (Volts)"
            color="#43A047"
          />
          <p className="text-center text-2xl font-bold mt-4">{data.Vrms.toFixed(2)} V</p>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-md">
          <GaugeChart
            value={data.Power}
            maxValue={7}
            label="Power (Watts)"
            color="#FB8C00"
          />
          <p className="text-center text-2xl font-bold mt-4">{data.Power.toFixed(2)} W</p>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-md">
          <GaugeChart
            value={data.kWh}
            maxValue={100}
            label="Kilowatts (kW)"
            color="#D32F2F"
          />
          <p className="text-center text-2xl font-bold mt-4">{data.kWh} kW</p>
        </div>
      </div>

      {/* Conversion Section */}
      <div className="mt-8 bg-white shadow-lg p-6 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Kilowatts to PHP Conversion</h3>
        <p className="text-lg">
          {data.kWh.toFixed(2)} kW = ₱{cost} (at ₱{conversionRate}/kWh)
        </p>
      </div>
    </div>
  );
};

export default EnergyMeter;
