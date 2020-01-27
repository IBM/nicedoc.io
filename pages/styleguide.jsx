import React from 'react'

export default () => (
  <div>
    <style
      dangerouslySetInnerHTML={{
        __html:
          '\n\n    section {\n      display: flex;\n      justify-content: center;\n      padding: 3.815rem 0;\n    }\n\n    section h6 a {\n      text-decoration: none;\n      position: relative;\n      text-transform: uppercase;\n      color: inherit;\n    }\n\n    section h6 a::before {\n      content: "#";\n      position: absolute;\n      left: -1rem;\n      color: #d8d8d8;\n      opacity: 0;\n    }\n\n    section h6 a:hover::before {\n      opacity: 1;\n    }\n\n    /* Header\n    ––––––––––––––––––––––––––––––––– */\n    .header__container {\n      min-height: calc(100vh - ((100vh / 25) * 1.563)); /* ((100vh / 25) * 1.563) == top padding on body */\n      display: flex;\n      align-items: center;\n      padding-top: 0;\n    }\n\n    .header__logo {\n      width: 5rem;\n    }\n\n    .header__logo-text {\n      display: block;\n    }\n\n    .header__table-of-contents {\n      display: flex;\n      flex-wrap: wrap;\n    }\n\n    .header__table-of-contents-item {\n      min-width: 49%;\n      flex-basis: 50%;\n      flex-shrink: 1;\n      display: inline-block;\n      margin: 0.328rem 0;\n      color: inherit;\n      text-decoration: none;\n    }\n\n    .header__table-of-contents-item h6 {\n      margin: 0;\n    }\n\n    @media (max-width: 500px) {\n      .header__table-of-contents-item {\n        min-width: 100%;\n      }\n    }\n\n    /* Buttons\n    ––––––––––––––––––––––––––––––––– */\n    .buttons__list * {\n      margin-bottom: 0 !important;\n      margin-right: 1ex !important;\n    }\n\n    /* Color\n    ––––––––––––––––––––––––––––––––– */\n    .color__container {\n      display: flex;\n      flex-wrap: wrap;\n      margin-bottom: 3rem;\n    }\n\n    .color__item {\n      flex: 0 0 25%;\n      min-width: 8rem;\n    }\n\n    .color__preview {\n      padding-bottom: 50%;\n    }\n\n    /* List\n    ––––––––––––––––––––––––––––––––– */\n    .list__unordered-list {\n      display: inline-block;\n      width: 49%;\n    }\n\n    .list__ordered-list {\n      display: inline-block;\n      width: 49%;\n    }\n\n    @media (max-width: 500px) {\n      .list__unordered-list {\n        min-width: 100%;\n      }\n\n      .list__ordered-list {\n        min-width: 100%;\n      }\n    }\n\n  '
      }}
    />
    <section className='header__container'>
      <div className='u-readable'>
        <header>
          <h2>
            <img
              src='https://caiogondim.github.io/superstylin/icon.svg'
              className='header__logo'
            />
          </h2>
          <h2 className='header__logo-text'>Suprstylin</h2>
        </header>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium
          sed odio facilis dignissimos laborum ut soluta <a href='#'>lorem</a>{' '}
          rerum! Corrupti quibusdam, quas error natus labore libero ducimus
          distinctio obcaecati nobis maxime neque.
        </p>
        <div className='header__header__table-of-contents'>
          <a
            href='#typography'
            className='
    header__table-of-contents-item
    typography__color
  '
          >
            <h6>TYPOGRAPHY</h6>
          </a>
          <a
            href='#buttons'
            className='
    header__table-of-contents-item
    buttons__color
  '
          >
            <h6>BUTTONS</h6>
          </a>
          <a
            href='#forms'
            className='
    header__table-of-contents-item
    forms__color
  '
          >
            <h6>FORMS</h6>
          </a>
          <a
            href='#tables'
            className='
    header__table-of-contents-item
    tables__color
  '
          >
            <h6>TABLES</h6>
          </a>
          <a
            href='#code'
            className='
    header__table-of-contents-item
    code__color
  '
          >
            <h6>CODE</h6>
          </a>
          <a
            href='#blockquote'
            className='
    header__table-of-contents-item
    blockquote__color
  '
          >
            <h6>BLOCKQUOTE</h6>
          </a>
          <a
            href='#lists'
            className='
    header__table-of-contents-item
    list__color
  '
          >
            <h6>LISTS</h6>
          </a>
          <a
            href='#keyboard'
            className='
    header__table-of-contents-item
    list__color
  '
          >
            <h6>KEYBOARD</h6>
          </a>
          <a href='#abbreviation' className='header__table-of-contents-item'>
            <h6>ABBREVIATON</h6>
          </a>
          <a href='#spinner' className='header__table-of-contents-item'>
            <h6>SPINNER</h6>
          </a>
          <a
            href='#colors'
            className='
    header__table-of-contents-item
  '
          >
            <h6>COLORS</h6>
          </a>
          <a
            href='#contrast'
            className='
    header__table-of-contents-item
  '
          >
            <h6>CONTRAST</h6>
          </a>
          <a
            href='#utilities'
            className='
    header__table-of-contents-item
  '
          >
            <h6>UTILITIES</h6>
          </a>
          <a
            href='#examples'
            className='
    header__table-of-contents-item
  '
          >
            <h6>EXAMPLES</h6>
          </a>
        </div>
      </div>
    </section>
    <section className='section-typography'>
      <div className='container u-readable'>
        <h6 className='typography__color u-separator' id='typography'>
          <a href='#typography'>typography</a>
        </h6>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
          adipisci quisquam veniam, odio illum sed maiores aspernatur
          consequuntur excepturi quos! Repellat unde excepturi vitae aut
          voluptas fugiat voluptatum iusto, quaerat.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
          adipisci quisquam veniam, odio illum sed maiores aspernatur
          consequuntur excepturi quos! Repellat unde excepturi vitae aut
          voluptas fugiat voluptatum iusto, quaerat.
        </p>
        <small>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
          adipisci quisquam veniam, odio illum sed maiores aspernatur
          consequuntur excepturi quos! Repellat unde excepturi vitae aut
          voluptas fugiat voluptatum iusto, quaerat.
        </small>
      </div>
    </section>
    <section className='section-buttons'>
      <div className='container u-readable'>
        <h6 className='typography__color u-separator' id='buttons'>
          <a href='#buttons'>buttons</a>
        </h6>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
          doloribus nisi, excepturi earum debitis quisquam? Error accusantium
          autem rerum assumenda iusto voluptates vero, doloribus, repellendus
          aliquid ipsum, iure beatae sunt!
        </p>
        <p className='buttons__list' style={{ marginBottom: '1ex' }}>
          {/* Standard buttons */}
          <a className='button' href='#'>
            Anchor
          </a>
          <button>Button</button>
          <input type='submit' defaultValue='Submit' />
          <input type='button' defaultValue='Button input' />
        </p>
        <p className='buttons__list'>
          {/* Primary buttons */}
          <a className='button button-primary' href='#'>
            Anchor
          </a>
          <button className='button-primary'>Button</button>
          <input
            className='button-primary'
            type='submit'
            defaultValue='Submit'
          />
          <input
            className='button-primary'
            type='button'
            defaultValue='Button input'
          />
        </p>
        <pre>
          <code>
            &lt;!-- Standard buttons --&gt;{'\n'}&lt;a class="button"
            href="#"&gt;Anchor&lt;/a&gt;{'\n'}
            &lt;button&gt;Button&lt;/button&gt;{'\n'}&lt;input type="submit"
            value="Submit" /&gt;{'\n'}&lt;input type="button" value="Button
            input" /&gt;{'\n'}
            {'\n'}&lt;!-- Primary buttons --&gt;{'\n'}&lt;a class="button
            button-primary" href="#"&gt;Anchor&lt;/a&gt;{'\n'}&lt;button
            class="button-primary"&gt;Button&lt;/button&gt;{'\n'}&lt;input
            class="button-primary" type="submit" value="Submit"&gt;{'\n'}
            &lt;input class="button-primary" type="button" value="Button
            input"&gt;
          </code>
        </pre>
      </div>
    </section>
    <section className='section-typography'>
      <div className='container u-readable'>
        <h6 className='typography__color u-separator' id='forms'>
          <a href='#forms'>forms</a>
        </h6>
        <form>
          <p>
            <label htmlFor='exampleEmailInput'>Your email</label>
            <input
              className='u-full-width'
              type='email'
              placeholder='test@mailbox.com'
              id='exampleEmailInput'
              autoComplete='new-password'
            />
          </p>
          <p>
            <label htmlFor='exampleRecipientInput'>Reason for contacting</label>
            <select className='u-full-width' id='exampleRecipientInput'>
              <option value='Option 1'>Questions</option>
              <option value='Option 2'>Admiration</option>
              <option value='Option 3'>Can I get your number?</option>
            </select>
          </p>
          <p>
            <label htmlFor='exampleMessage'>Message</label>
            <textarea
              className='u-full-width'
              placeholder='Hi Dave …'
              id='exampleMessage'
              defaultValue=''
            />
          </p>
          <p>
            <label>
              <input type='radio' name='lorem' defaultValue='lorem' /> Lorem
            </label>
            <label>
              <input type='radio' name='lorem' defaultValue='ipsum' /> Ipsum
            </label>
          </p>
          <p>
            <label className='example-send-yourself-copy'>
              <input type='checkbox' />
              <span className='label-body'>Send a copy to yourself</span>
            </label>
          </p>
          <input type='reset' defaultValue='Reset' />
          <input
            className='button-primary'
            type='submit'
            defaultValue='Submit'
          />
        </form>
      </div>
    </section>
    <section className='section-typography'>
      <div className='container u-readable'>
        <h6 className='typography__color u-separator' id='tables'>
          <a href='#tables'>tables</a>
        </h6>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo
          ipsam quibusdam libero, nobis earum totam doloremque veritatis
          expedita deserunt cum et distinctio, placeat dolorum in maxime,
          voluptates ratione optio nihil!
        </p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Height</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Stephen Curry</td>
              <td>27</td>
              <td>1,91</td>
            </tr>
            <tr>
              <td>Klay Thompson</td>
              <td>25</td>
              <td>2,01</td>
            </tr>
          </tbody>
        </table>
        <pre>
          <code>
            &lt;table&gt;{'\n'}
            {'  '}&lt;thead&gt;{'\n'}
            {'    '}&lt;tr&gt;{'\n'}
            {'      '}&lt;th&gt;Name&lt;/th&gt;{'\n'}
            {'      '}&lt;th&gt;Age&lt;/th&gt;{'\n'}
            {'      '}&lt;th&gt;Height&lt;/th&gt;{'\n'}
            {'    '}&lt;/tr&gt;{'\n'}
            {'  '}&lt;/thead&gt;{'\n'}
            {'  '}&lt;tbody&gt;{'\n'}
            {'    '}&lt;tr&gt;{'\n'}
            {'      '}&lt;td&gt;Stephen Curry&lt;/td&gt;{'\n'}
            {'      '}&lt;td&gt;27&lt;/td&gt;{'\n'}
            {'      '}&lt;td&gt;1,91&lt;/td&gt;{'\n'}
            {'    '}&lt;/tr&gt;{'\n'}
            {'    '}&lt;tr&gt;{'\n'}
            {'      '}&lt;td&gt;Klay Thompson&lt;/td&gt;{'\n'}
            {'      '}&lt;td&gt;25&lt;/td&gt;{'\n'}
            {'      '}&lt;td&gt;2,01&lt;/td&gt;{'\n'}
            {'    '}&lt;/tr&gt;{'\n'}
            {'  '}&lt;/tbody&gt;{'\n'}&lt;/table&gt;
          </code>
        </pre>
      </div>
    </section>
    <section>
      <div className='container u-readable'>
        <h6 className='typography__color u-separator' id='code'>
          <a href='#code'>code</a>
        </h6>
        <p>
          Code styling is kept basic – just wrap anything in a{' '}
          <code>&lt;code&gt;</code> and it will appear like this. For blocks of
          code, wrap a <code>&lt;code&gt;</code> with a <code>&lt;pre&gt;</code>
          .
        </p>
        <pre>
          <code>
            .some-class {'{'}
            {'\n'}
            {'  '}background-color: red;{'\n'}
            {'}'}
          </code>
        </pre>
      </div>
    </section>
    <section>
      <div className='container u-readable'>
        <h6 className='typography__color u-separator' id='blockquote'>
          <a href='#blockquote'>blockquote</a>
        </h6>
        <blockquote>
          <p>Enta in de dance, plug it in and we begin</p>
          <footer>— Groove Armada</footer>
        </blockquote>
        <pre>
          <code>
            &lt;blockquote&gt;{'\n'}
            {'  '}&lt;p&gt;{'\n'}
            {'    '}Enta in de dance, plug it in and we begin{'\n'}
            {'  '}&lt;/p&gt;{'\n'}
            {'  '}&lt;footer&gt;— Groove Armada&lt;/footer&gt;{'\n'}
            &lt;/blockquote&gt;
          </code>
        </pre>
      </div>
    </section>
    <section>
      <div className='container u-readable'>
        <h6 className='typography__color u-separator' id='lists'>
          <a href='#lists'>lists</a>
        </h6>
        <div className='list__unordered-list'>
          <p>Unordered list:</p>
          <ul>
            <li>Lorem</li>
            <li>Ipsum</li>
            <li>Dolor</li>
          </ul>
        </div>
        <div className='list__ordered-list'>
          <p>Ordered list:</p>
          <ol>
            <li>Lorem</li>
            <li>Ipsum</li>
            <li>Dolor</li>
          </ol>
        </div>
        <pre>
          <code>
            &lt;!-- Unordered list --&gt;{'\n'}&lt;ul&gt;{'\n'}
            {'  '}&lt;li&gt;Lorem&lt;/li&gt;{'\n'}
            {'  '}&lt;li&gt;Ipsum&lt;/li&gt;{'\n'}
            {'  '}&lt;li&gt;Dolor&lt;/li&gt;{'\n'}&lt;/ul&gt;{'\n'}
            {'\n'}&lt;!-- Ordered list --&gt;{'\n'}&lt;ol&gt;{'\n'}
            {'  '}&lt;li&gt;Lorem&lt;/li&gt;{'\n'}
            {'  '}&lt;li&gt;Ipsum&lt;/li&gt;{'\n'}
            {'  '}&lt;li&gt;Dlior&lt;/li&gt;{'\n'}&lt;/ol&gt;
          </code>
        </pre>
      </div>
    </section>
    <section>
      <div className='container u-readable'>
        <h6 className='typography__color u-separator' id='keyboard'>
          <a href='#keyboard'>keyboard</a>
        </h6>
        <p>
          <kbd>command</kbd> <kbd>shift</kbd> <kbd>C</kbd> to inspect element.
          <br />
          <kbd>command</kbd> <kbd>option</kbd> <kbd>I</kbd> to open DevTools.
          <br />
        </p>
        <pre>
          <code>
            &lt;kbd&gt;command&lt;/kbd&gt; &lt;kbd&gt;shift&lt;/kbd&gt;
            &lt;kbd&gt;C&lt;/kbd&gt; to inspect element.{'\n'}
            &lt;kbd&gt;command&lt;/kbd&gt; &lt;kbd&gt;option&lt;/kbd&gt;
            &lt;kbd&gt;I&lt;/kbd&gt; to open DevTools.
          </code>
        </pre>
      </div>
    </section>
    <section>
      <div className='container u-readable'>
        <h6 className='typography__color u-separator' id='abbreviation'>
          <a href='#abbreviation'>abbreviation</a>
        </h6>
        <p>
          Hover over to see the abbreviation:{' '}
          <abbr title='Cascading StyleSheets'>CSS</abbr>
        </p>
        <pre>
          <code>
            &lt;abbr title="Cascading StyleSheets"&gt;CSS&lt;/abbr&gt;
          </code>
        </pre>
      </div>
    </section>
    <section>
      <div className='container u-readable'>
        <h6 className='typography__color u-separator' id='spinner'>
          <a href='#spinner'>spinner</a>
        </h6>
        <div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '\n          .spinner-wrapper {\n            margin: 4rem 0 4rem 0;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n          }\n        '
            }}
          />
          <div className='spinner-wrapper'>
            <p className='ss-spinner' />
          </div>
          <pre>
            <code>&lt;p class="spinner"&gt;&lt;/p&gt;</code>
          </pre>
        </div>
      </div>
    </section>
    <section className='section-color'>
      <div className='container u-readable'>
        <h6 className='typography__color u-separator' id='colors'>
          <a href='#colors'>colors</a>
        </h6>
        <div className='color__container'>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#FDE876' }}
            />
            <p>
              <b>Yellow 10</b>
              <br />
              #FDE876
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#FDD600' }}
            />
            <p>
              <b>Yellow 20</b>
              <br />
              #FDD600
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#DBB100' }}
            />
            <p>
              <b>Yellow 30</b>
              <br />
              #DBB100
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#BE9B00' }}
            />
            <p>
              <b>Yellow 40</b>
              <br />
              #BE9B00
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#8C7300' }}
            />
            <p>
              <b>Yellow 50</b>
              <br />
              #8C7300
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#735F00' }}
            />
            <p>
              <b>Yellow 60</b>
              <br />
              #735F00
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#574A00' }}
            />
            <p>
              <b>Yellow 70</b>
              <br />
              #574A00
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#3C3200' }}
            />
            <p>
              <b>Yellow 80</b>
              <br />
              #3C3200
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#281E00' }}
            />
            <p>
              <b>Yellow 90</b>
              <br />
              #281E00
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#020100' }}
            />
            <p>
              <b>Yellow 100</b>
              <br />
              #020100
            </p>
          </div>
        </div>
        <div className='color__container'>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#C8F08F' }}
            />
            <p>
              <b>Green 10</b>
              <br />
              #C8F08F
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#B4E051' }}
            />
            <p>
              <b>Green 20</b>
              <br />
              #B4E051
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#8CD211' }}
            />
            <p>
              <b>Green 30</b>
              <br />
              #8CD211
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#5AA700' }}
            />
            <p>
              <b>Green 40</b>
              <br />
              #5AA700
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#4B8400' }}
            />
            <p>
              <b>Green 50</b>
              <br />
              #4B8400
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#2D660A' }}
            />
            <p>
              <b>Green 60</b>
              <br />
              #2D660A
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#144D14' }}
            />
            <p>
              <b>Green 70</b>
              <br />
              #144D14
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#0A3C02' }}
            />
            <p>
              <b>Green 80</b>
              <br />
              #0A3C02
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#0C2808' }}
            />
            <p>
              <b>Green 90</b>
              <br />
              #0C2808
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#010200' }}
            />
            <p>
              <b>Green 100</b>
              <br />
              #010200
            </p>
          </div>
        </div>
        <div className='color__container'>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#A7FAE6' }}
            />
            <p>
              <b>Teal 10</b>
              <br />
              #A7FAE6
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#6EEDD8' }}
            />
            <p>
              <b>Teal 20</b>
              <br />
              #6EEDD8
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#41D6C3' }}
            />
            <p>
              <b>Teal 30</b>
              <br />
              #41D6C3
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#00B4A0' }}
            />
            <p>
              <b>Teal 40</b>
              <br />
              #00B4A0
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#008571' }}
            />
            <p>
              <b>Teal 50</b>
              <br />
              #008571
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#006D5D' }}
            />
            <p>
              <b>Teal 60</b>
              <br />
              #006D5D
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#005448' }}
            />
            <p>
              <b>Teal 70</b>
              <br />
              #005448
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#003C32' }}
            />
            <p>
              <b>Teal 80</b>
              <br />
              #003C32
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#012B22' }}
            />
            <p>
              <b>Teal 90</b>
              <br />
              #012B22
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#000202' }}
            />
            <p>
              <b>Teal 100</b>
              <br />
              #000202
            </p>
          </div>
        </div>
        <div className='color__container'>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#C0E6FF' }}
            />
            <p>
              <b>Blue 10</b>
              <br />
              #C0E6FF
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#7CC7FF' }}
            />
            <p>
              <b>Blue 20</b>
              <br />
              #7CC7FF
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#5AAAFA' }}
            />
            <p>
              <b>Blue 30</b>
              <br />
              #5AAAFA
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#5596E6' }}
            />
            <p>
              <b>Blue 40</b>
              <br />
              #5596E6
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#4178BE' }}
            />
            <p>
              <b>Blue 50</b>
              <br />
              #4178BE
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#325C80' }}
            />
            <p>
              <b>Blue 60</b>
              <br />
              #325C80
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#264A60' }}
            />
            <p>
              <b>Blue 70</b>
              <br />
              #264A60
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#1D3649' }}
            />
            <p>
              <b>Blue 80</b>
              <br />
              #1D3649
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#152935' }}
            />
            <p>
              <b>Blue 90</b>
              <br />
              #152935
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#010205' }}
            />
            <p>
              <b>Blue 100</b>
              <br />
              #010205
            </p>
          </div>
        </div>
        <div className='color__container'>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#EED2FF' }}
            />
            <p>
              <b>Purple 10</b>
              <br />
              #EED2FF
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#D7AAFF' }}
            />
            <p>
              <b>Purple 20</b>
              <br />
              #D7AAFF
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#BA8FF7' }}
            />
            <p>
              <b>Purple 30</b>
              <br />
              #BA8FF7
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#AF6EE8' }}
            />
            <p>
              <b>Purple 40</b>
              <br />
              #AF6EE8
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#9855D4' }}
            />
            <p>
              <b>Purple 50</b>
              <br />
              #9855D4
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#734098' }}
            />
            <p>
              <b>Purple 60</b>
              <br />
              #734098
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#562F72' }}
            />
            <p>
              <b>Purple 70</b>
              <br />
              #562F72
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#412356' }}
            />
            <p>
              <b>Purple 80</b>
              <br />
              #412356
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#311A41' }}
            />
            <p>
              <b>Purple 90</b>
              <br />
              #311A41
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#030103' }}
            />
            <p>
              <b>Purple 100</b>
              <br />
              #030103
            </p>
          </div>
        </div>
        <div className='color__container'>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#FFD2FF' }}
            />
            <p>
              <b>Magenta 10</b>
              <br />
              #FFD2FF
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#FF9EEE' }}
            />
            <p>
              <b>Magenta 20</b>
              <br />
              #FF9EEE
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#FF71D4' }}
            />
            <p>
              <b>Magenta 30</b>
              <br />
              #FF71D4
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#FF3CA0' }}
            />
            <p>
              <b>Magenta 40</b>
              <br />
              #FF3CA0
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#DB2780' }}
            />
            <p>
              <b>Magenta 50</b>
              <br />
              #DB2780
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#A6266E' }}
            />
            <p>
              <b>Magenta 60</b>
              <br />
              #A6266E
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#7C1C58' }}
            />
            <p>
              <b>Magenta 70</b>
              <br />
              #7C1C58
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#601146' }}
            />
            <p>
              <b>Magenta 80</b>
              <br />
              #601146
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#3A0B2E' }}
            />
            <p>
              <b>Magenta 90</b>
              <br />
              #3A0B2E
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#040102' }}
            />
            <p>
              <b>Magenta 100</b>
              <br />
              #040102
            </p>
          </div>
        </div>
        <div className='color__container'>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#FFD2DD' }}
            />
            <p>
              <b>Red 10</b>
              <br />
              #FFD2DD
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#FFA5B4' }}
            />
            <p>
              <b>Red 20</b>
              <br />
              #FFA5B4
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#FF7D87' }}
            />
            <p>
              <b>Red 30</b>
              <br />
              #FF7D87
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#FF5050' }}
            />
            <p>
              <b>Red 40</b>
              <br />
              #FF5050
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#E71D32' }}
            />
            <p>
              <b>Red 50</b>
              <br />
              #E71D32
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#AD1625' }}
            />
            <p>
              <b>Red 60</b>
              <br />
              #AD1625
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#8C101C' }}
            />
            <p>
              <b>Red 70</b>
              <br />
              #8C101C
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#6E0A1E' }}
            />
            <p>
              <b>Red 80</b>
              <br />
              #6E0A1E
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#4C0A17' }}
            />
            <p>
              <b>Red 90</b>
              <br />
              #4C0A17
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#040001' }}
            />
            <p>
              <b>Red 100</b>
              <br />
              #040001
            </p>
          </div>
        </div>
        <div className='color__container'>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#FFD791' }}
            />
            <p>
              <b>Orange 10</b>
              <br />
              #FFD791
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#FFA573' }}
            />
            <p>
              <b>Orange 20</b>
              <br />
              #FFA573
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#FF7832' }}
            />
            <p>
              <b>Orange 30</b>
              <br />
              #FF7832
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#FF5003' }}
            />
            <p>
              <b>Orange 40</b>
              <br />
              #FF5003
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#D74108' }}
            />
            <p>
              <b>Orange 50</b>
              <br />
              #D74108
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#A53725' }}
            />
            <p>
              <b>Orange 60</b>
              <br />
              #A53725
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#872A0F' }}
            />
            <p>
              <b>Orange 70</b>
              <br />
              #872A0F
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#6D120F' }}
            />
            <p>
              <b>Orange 80</b>
              <br />
              #6D120F
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#43100B' }}
            />
            <p>
              <b>Orange 90</b>
              <br />
              #43100B
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#030100' }}
            />
            <p>
              <b>Orange 100</b>
              <br />
              #030100
            </p>
          </div>
        </div>
        <div className='color__container'>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#eaeaea' }}
            />
            <p>
              <b>Gray 10</b>
              <br />
              #eaeaea
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#d8d8d8' }}
            />
            <p>
              <b>Gray 20</b>
              <br />
              #d8d8d8
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#c0bfc0' }}
            />
            <p>
              <b>Gray 30</b>
              <br />
              #c0bfc0
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#a6a5a6' }}
            />
            <p>
              <b>Gray 40</b>
              <br />
              #a6a5a6
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#949394' }}
            />
            <p>
              <b>Gray 50</b>
              <br />
              #949394
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#777677' }}
            />
            <p>
              <b>Gray 60</b>
              <br />
              #777677
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#595859' }}
            />
            <p>
              <b>Gray 70</b>
              <br />
              #595859
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#464646' }}
            />
            <p>
              <b>Gray 80</b>
              <br />
              #464646
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#343334' }}
            />
            <p>
              <b>Gray 90</b>
              <br />
              #343334
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#272727' }}
            />
            <p>
              <b>Gray 100</b>
              <br />
              #272727
            </p>
          </div>
        </div>
        <div className='color__container'>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#fcfcfc' }}
            />
            <p>
              <b>Neutral White 1</b>
              <br />
              #fcfcfc
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#f9f9f9' }}
            />
            <p>
              <b>Neutral White 2</b>
              <br />
              #f9f9f9
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#f6f6f6' }}
            />
            <p>
              <b>Neutral White 3</b>
              <br />
              #f6f6f6
            </p>
          </div>
          <div className='color__item'>
            <div
              className='color__preview'
              style={{ backgroundColor: '#f3f3f3' }}
            />
            <p>
              <b>Neutral White 4</b>
              <br />
              #f3f3f3
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
)
