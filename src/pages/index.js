// import { Client } from "appwrite";

// const client = new Client();

// client
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject("64aa5699ae45fe1cc4bb");

import React from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "../styles/MainPage.css";

function index() {
  const [inputText, setInputText] = useState("Hello World");
  const [inputLanguage, setInputLanguage] = useState("english");
  const [outputLanguage, setOutputLanguage] = useState("french");
  const [outputText, setOutputText] = useState("");

  function clearInputLanugae() {
    setInputText("");
  }

  function translate(input, inputLanguage, outputLanguage) {
    console.log(input, inputLanguage, outputLanguage);
    let language_codes = {
      english: "en",
      french: "fr",
      hindi: "hi",
      tamil: "ta",
    };
    let key = "";

    if(key==""){

      alert("Please assign the Subscription Key")
      return
    }
    let endpoint = "https://api.cognitive.microsofttranslator.com";

    let location = "southeastasia";

    axios({
      baseURL: endpoint,
      url: "/translate",
      method: "post",
      headers: {
        "Ocp-Apim-Subscription-Key": key,

        "Ocp-Apim-Subscription-Region": location,
        "Content-type": "application/json",
        "X-ClientTraceId": uuidv4().toString(),
      },
      params: {
        "api-version": "3.0",
        from: language_codes[inputLanguage],
        to: [language_codes[outputLanguage]],
      },
      data: [
        {
          text: "Hello Everyone!",
        },
      ],
      responseType: "json",
    }).then(function (response) {
      setOutputText(response.data[0].translations[0].text);
      //   console.log(JSON.stringify(response.data, null, 4));
    });
  }

  //   translate();

  function copyOutput() {
    navigator.clipboard.writeText(outputText);
  }

  return (
    <div>
      <h1>🐷 Language Translator 🐽</h1>
      <section class="flex wrap">
        <div class="input">
          <label class="pure-material-textfield-outlined">
            <textarea
              id="input"
              value={inputText}
              onChange={(text) => {
                setInputText(text.target.value);
              }}
              placeholder=" "
              rows="10"
            ></textarea>
          </label>
          <button
            onClick={clearInputLanugae}
            id="clear"
            class="pure-material-button-outlined center"
          >
            Clear
          </button>
          <label for="inputLanguage">Choose a Language:</label>

          <select
            onChange={(text) => {
              setInputLanguage(text.target.value);
            }}
            value={inputLanguage}
            name="inputLanguage"
            id="langauge"
          >
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="hindi">Hindi</option>
            <option value="tamil">Tamil</option>
          </select>
        </div>
        <div class="output">
          <label class="pure-material-textfield-outlined">
            <textarea
              value={outputText}
              onChange={(text) => {
                setOutputText(text.target.value);
              }}
              id="output"
              placeholder=" "
              rows="10"
              readonly="readonly"
            ></textarea>
          </label>
          <button
            onClick={copyOutput}
            id="copy"
            class="pure-material-button-contained center"
          >
            Copy
          </button>
          <label for="outputLanguage">Choose a Language:</label>

          <select
            value={outputLanguage}
            name="outputLanguage"
            id="langauge"
            onChange={(text) => {
              setOutputLanguage(text.target.value);
            }}
          >
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="hindi">Hindi</option>
            <option value="tamil">Tamil</option>
          </select>
        </div>
      </section>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={translate.bind("", inputText, inputLanguage, outputLanguage)}
        >
          Translate
        </button>
      </section>
    </div>
  );
}

export default index;
