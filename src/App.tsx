import React, { useState } from 'react';
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import Reducer from './store/reducers';
import * as action from './store/actions';
import { bindActionCreators } from 'redux';

const getAns = () => {
  let Anses:string[] = []
  let k = Math.round(Math.random()*10);
  while (Anses.length < 4) {
    if (!Anses.find(x => x===k.toString()))
    {
      Anses.push(k.toString())
    }
    k = Math.round(Math.random()*10);
  }
  return Anses[0] +Anses[1]+Anses[2]+Anses[3]
}

let Ans = getAns();

type State = ReturnType<typeof Reducer>

const getGuseeAns = (guessNums:string[]) => {
  let ansSteings = Ans.split("")
  let A = 0
  let B = 0
  ansSteings.map((ansSteing,index)=>{
    guessNums.map((guessNum,index1)=>{
      if (ansSteing===guessNum) {
        if(index === index1){
          A++
        }
        else{
          B++
        }
      }
    })
  })
  return `${A}A${B}B`
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const {addNum,clearNum} = bindActionCreators(action, dispatch);
  const guess = useSelector((state: State) => state.guess);

  const validate = Yup.object({
    Guess: Yup.string().matches(/(\d)/, "請輸入數字").matches(/^(?!.*(\d).*\1).*$/, "數字重複").min(4, "請輸入4個數字").max(4, "請輸入4個數字").required("必填")
  })

  const [win, setWin] = useState(false)

  const btnOnClick = () => {
    clearNum();
    Ans = getAns();
    setWin(false);
  }

  return (
    <div>
      <div className="bg-blue-400 w-screen sticky top-0 flex z-50 justify-center h-10 items-center ">
        1A2B猜數字
      </div>
      <div className="flex flex-col items-center w-3/4 m-auto bg-red-100">
        <div className="text-yellow-700">
          <p>1. 一進到遊戲電腦隨機產生4位不重複數字</p>
          <p>2. 使用者送出答案，若不符合「不重複4位數字」則跳錯誤訊息</p>
          <p>3. 送出的答案跟正確答案比較，位置一樣則A，位置不同則B</p>
          <p>4. 會累積過去猜過的答案與結果</p>
          <p>5. 如果猜到 4A 則遊戲結束，並可另開新局</p>
        </div>
        <Formik
          initialValues={{
            Guess: ''
          }}
          validationSchema={validate}
          onSubmit={(values,actions) => {
            let numGuess = values.Guess.split("")
            addNum(`${values.Guess}->${getGuseeAns(numGuess)}`)
            actions.resetForm()
            if(getGuseeAns(numGuess)==="4A0B"){
              setWin(true);
              window.alert("遊戲獲勝!!");
            }
          }}>
          {
            formik => {
              return (
                <div className="flex flex-col items-center">
                  <Form className="flex flex-col">
                    <p>輸入數字</p>
                    <Field type="text" name='Guess' value={formik.values.Guess} className={` ${formik.errors.Guess && "bg-red-600"}`} disabled={win?true:false} />
                    <ErrorMessage name="Guess" />
                    <div className="flex justify-between m-auto">
                      <button type="submit" className="m-2 rounded-lg border-2 w-20 bg-green-50 hover:bg-green-200" disabled={win?true:false} >提交</button>
                      <button type="reset" className="m-2 rounded-lg border-2 w-20 bg-red-50 hover:bg-red-200">重製</button>
                    </div>
                  </Form>
                  {
                    win?<button onClick={btnOnClick} className="m-2 rounded-lg border-2 w-20 bg-green-50 hover:bg-green-200">再來一局</button>:''
                  }
                </div>)
            }
          }
        </Formik>
      </div>
      <div className="flex flex-col items-center">
        {
          guess.map((num) => {
            return(
              <p key={num}>{num}</p>
            )
          })
        }
      </div>
    </div>

  );
}

export default (App);
