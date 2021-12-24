import React, {useState} from 'react';
import styles from './index.css';
import { Input, InputNumber, Card } from 'antd';
const { Search } = Input ;
export default function() {

  const defaultResultCount:number = 10;
  const [resultCount, setResultCount] = useState(defaultResultCount);
  const [missionName, setMissionName] = useState("");

  const onSearch = () => {
    console.log(missionName +" "+ resultCount);
  }
  const onTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMissionName(e.currentTarget.value);
  }

  const onCountChange = (e : React.FormEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value;
    val = val.replace(/[a-z][A-Z]\s/, "");
    if (val !== ""){
      console.log(val, typeof(val), val.length, parseInt(val));

      let newValue = parseInt(val);
      console.log(newValue);
      setResultCount(newValue);
    }else if(val.length == 0  ){
      setResultCount(0);
    }else{
      setResultCount(0)
    }

  }

  return (
    <div className={styles.normal}>

      <Card bordered={true}
        className={styles.searchCard}
        title={<span style={{position: "relative", marginLeft:"20px", fontSize:"20px"}}>Search</span>} >
        <br/>
        <form onSubmit={onSearch}>
          <Search className={styles.searchInput}
            enterButton
            onSearch={onSearch}
            placeholder='Mission Name'
            value={missionName}
            onChange={onTextChange}
          />
          <Input className={styles.numberInput} defaultValue={defaultResultCount} value={resultCount}
           onChange={onCountChange}></Input>
        </form>
      </Card>
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            Getting Started
          </a>
        </li>
      </ul>
    </div>
  );
}
