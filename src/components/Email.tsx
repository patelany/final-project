import "./Email.css";

const Email = () => {
    handleSubmit (event) {
        const templateId = 'template_id';
        this.sendFeedback(templateId, {message_html: this.state.feedback, from_name: this.state.name, reply_to: this.state.email})
      }
  return (
    <form className="emailForm" onSubmit={handleSubmit} >
      <h1>Send Email to your doctor</h1>
      <div>
        <textarea
          id="test-mailing"
          name="test-mailing"
          onChange={handleChange}
          placeholder="Post some lorem ipsum here"
          required
          value={state.feedback}
          style={{ width: "100%", height: "150px" }}
        />
      </div>
      <input
        type="button"
        value="Submit"
        className="btn btn--submit"
        onClick={handleSubmit}
      />
    </form>
  );
};

export default Email;
