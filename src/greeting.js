// 從 react 庫中引入 React 和 useState。useState 是 React 的一個 hook，用於在功能組件中添加狀態。
import React, { useState } from 'react';
import './greeting.css';
import InputComponent from './inputComponent';
import ResultComponent from './resultComponent';
import BMITableView from './bmiTableView';

// 定義一個名為 Greeting 的功能組件。
function Greeting() {
    // 使用 useState hook 初始化一個名為 name 的狀態變量，並提供一個設定此狀態的函數 setName。
    // 初始值為空字符串。 
    // 在 React 中，Hook（鉤子）是一種特殊的功能，允許你在不編寫 class（類別）組件的情況下， 
    // 使用 state（狀態）和其他 React 功能。
    const [name, setName] = useState('');               // useState('John'); ← 加入初始值

    const [height, setHeight] = useState('');           // 新增身高的 state
    const [weight, setWeight] = useState('');           // 新增體重的 state
    const [bmiResult, setBmiResult] = useState(null);   // 儲存 BMI 計算結果

    const [records, setRecords] = useState([]);

    // 錯誤處理
    const [errorMessage, setErrorMessage] = useState('');  // 新增此行
    // 正則表示式: 判定是否是整數或浮點數
    const isValidNumber = value => /^[+-]?(\d*\.)?\d+$/.test(value);

    // 計算 BMI
    const calculateBMI = () => {
        // 錯誤處理
        if (!name || !height || !weight) {
            setErrorMessage('請確保所有欄位都已填寫。');  // 如果有欄位未填寫，顯示錯誤訊息
            return;  // 不繼續執行後面的代碼
        }

        if (!isValidNumber(height) || !isValidNumber(weight)) {
            setErrorMessage('請確保身高和體重是有效的數字。');
            return;
        }
        
        setErrorMessage('');  // 如果一切正常，清空錯誤訊息

        const heightInMeters = parseFloat(height) / 100; // 轉換公分到公尺
        const weightInKg = parseFloat(weight);

        if (heightInMeters > 0 && weightInKg > 0) {
            const bmi = weightInKg / (heightInMeters * heightInMeters);
            //setBmiResult(bmi.toFixed(2)); // 保留兩位小數
            const result = bmi.toFixed(2);
            setBmiResult(result);

            // 新增此次計算到紀錄中
            const newRecord = {
                name,
                height,
                weight,
                bmi: result,
                //time: new Date().toLocaleString(), // 現在的日期和時間
                time: new Date().toLocaleTimeString(), // 僅顯示現在的時間
            };
            setRecords([...records, newRecord]); // 新的紀錄在後面
        }
    };


    return (
        /*
        <div className='center-container'>
            // 渲染一個輸入框 <input>。該輸入框的當前值設定為 name，
            // 當輸入框的值發生變化時（onChange 事件），將更新 name 的值。
            <input className='centered-input' value={name} onChange={e => setName(e.target.value)} />
            <div className='centered-text'>{name}</div>
        </div>
        */

        /*
        <div className="center-container">
            <input
                className="centered-input"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="姓名"
            />
            <div className="centered-text">{name}</div>
            <p />
            <input
                className="centered-input"
                value={height}
                onChange={e => setHeight(e.target.value)}
                placeholder="身高 (公分)"
            />
            <p />
            <input
                className="centered-input"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder="體重 (公斤)"
            />
            <p />
            <button className="centered-input" onClick={calculateBMI}>計算 BMI</button>
            <p />
            {bmiResult && <div className="centered-text">BMI: {bmiResult}</div>}
        </div>
        */

        /*
        <div className="center-container">
            <InputComponent value={name} onChange={e => setName(e.target.value)} placeholder="姓名" />
            <InputComponent value={height} onChange={e => setHeight(e.target.value)} placeholder="身高 (公分)" />
            <InputComponent value={weight} onChange={e => setWeight(e.target.value)} placeholder="體重 (公斤)" />
            <button className="centered-input" onClick={calculateBMI}>計算 BMI</button>
            <ResultComponent result={bmiResult} />
        </div>
        */

        <div className="center-container">

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <InputComponent value={name} onChange={e => setName(e.target.value)} placeholder="姓名" />
            <InputComponent value={height} onChange={e => setHeight(e.target.value)} placeholder="身高 (公分)" />
            <InputComponent value={weight} onChange={e => setWeight(e.target.value)} placeholder="體重 (公斤)" />
            <button className="centered-input" onClick={calculateBMI}>計算 BMI</button>
            <p />
            <ResultComponent result={bmiResult} />
            <p />
            <BMITableView records={records} />
        </div>
    );
}

// 預設導出 Greeting 組件，使其他文件可以引入和使用它。
export default Greeting;