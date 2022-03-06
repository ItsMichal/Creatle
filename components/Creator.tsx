// import React from "react";

// // interface SolutionComponent

export const CreateForm: React.FC<{}> = () => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grad text-2xl font-bold mt-5">Main Data</div>
      <hr />
      <div className="columns-1 lg:columns-2">
        {/* <div className="w-full"> */}
        <div>
          <label>Name</label>
          <br />
          <input
            className="form-input w-full rounded-lg"
            id="name"
            type="text"
            required
          ></input>
          <br />
        </div>
        <div>
          <label>Description</label>
          <br />
          <input
            className="form-input w-full rounded-lg h-40"
            id="description"
            type="text"
            required
          ></input>
          <br />
        </div>

        <div>
          <label>Emoji</label>
          <br />
          <input
            className="form-input w-fit rounded-lg"
            id="emoji"
            type="text"
            required
          ></input>
          <br />
        </div>
        {/* </div> */}

        {/* <div> */}
        <div>
          <label>Tries</label>
          <br />
          <input
            className="form-input w-full rounded-lg"
            id="lineCount"
            type="number"
            required
          ></input>
          <br />
        </div>

        <div>
          <label>Puzzle By</label>
          <br />
          <input
            className="form-input w-full rounded-lg"
            id="name"
            type="text"
            required
          ></input>
          <br />
        </div>
        {/* </div> */}
      </div>
      <div className="grad text-2xl font-bold mt-5">Cell Data</div>
      <hr />
      <div className="columns-1 lg:columns-2">
        {/* <div className="w-full"> */}
        <div>
          <label>Width</label>
          <br />
          <input
            className="form-input w-fit rounded-lg"
            id="cellWidth"
            type="number"
            required
          ></input>
          <br />
        </div>
        <div>
          <label>Height</label>
          <br />
          <input
            className="form-input w-fit rounded-lg "
            id="cellHeight"
            type="text"
            required
          ></input>
          <br />
        </div>

        <div>
          <label>Text Color</label>
          <br />
          <input
            className="form-input w-20 h-10 p-0 rounded-lg"
            id="foreground"
            type="color"
            required
          ></input>
          <br />
        </div>
        {/* </div> */}

        {/* <div> */}
        <div>
          <label>Default BG Color</label>
          <br />
          <input
            className="form-input w-20 h-10 p-0 rounded-lg"
            id="foreground"
            type="color"
            required
          ></input>
          <br />
        </div>

        <div>
          <label>Close BG Color</label>
          <br />
          <input
            className="form-input w-20 h-10 p-0 rounded-lg"
            id="foreground"
            type="color"
            required
          ></input>
          <br />
        </div>
        <div>
          <label>Correct BG Color</label>
          <br />
          <input
            className="form-input w-20 h-10 p-0 rounded-lg"
            id="foreground"
            type="color"
            required
          ></input>
          <br />
        </div>
        <div>
          <label>Inocorrect BG Color</label>
          <br />
          <input
            className="form-input w-20 h-10 p-0 rounded-lg"
            id="foreground"
            type="color"
            required
          ></input>
          <br />
        </div>
        {/* </div> */}
      </div>
      <div className="grad text-2xl font-bold mt-5">Line Data</div>
      <hr />
      <div className="columns-1 lg:columns-2">
        {/* <div className="w-full"> */}
        <div>
          <label>Number of Cells on X-Axis</label>
          <br />
          <input
            className="form-input w-fit rounded-lg"
            id="cellsNumX"
            type="number"
            required
          ></input>
          <br />
        </div>
        <div>
          <label>Number of Cells on Y-Axis</label>
          <br />
          <input
            className="form-input w-fit rounded-lg "
            id="cellsNumY"
            type="number"
            required
          ></input>
          <br />
        </div>
        <div>
          <label>Height of Row</label>
          <br />
          <input
            className="form-input w-fit rounded-lg "
            id="rowHeight"
            type="number"
            required
          ></input>
          <br />
        </div>
        <div>
          <label>Width of Row</label>
          <br />
          <input
            className="form-input w-fit rounded-lg "
            id="rowWidth"
            type="number"
            required
          ></input>
          <br />
        </div>
      </div>
      <div className="grad text-2xl font-bold mt-5">Inputs Data</div>
      <hr />
      <div className="columns-1 ">
        {/* <div className="w-full"> */}
        <div>
          <label>List of Valid Inputs (separate each one by comma)</label>
          <br />
          <input
            className="form-input break-word w-full min-h-fit h-20 rounded-lg"
            id="cellsNumX"
            type="textarea"
            required
          ></input>
          <br />
        </div>
      </div>
      <div className="grad text-2xl font-bold mt-5">Solutions Data</div>
      <hr />
      <div className="columns-1 ">
        {/* <div className="w-full"> */}
        <div>
          <label>List of Valid Solutions (separate each element in solution by comma, and each solution by newline)</label>
          <br />
          <textarea
            className="form-input break-word w-full min-h-fit h-20 rounded-lg"
            id="cellsNumX"
            required
          ></textarea>
          <br />
        </div>
      </div>
      <button
        className="button w-full bg-blue-700 p-2 rounded my-2 text-white"
        type="submit"
      >
        Create Puzzle!
      </button>
    </form>
  );
};

export default { CreateForm };
