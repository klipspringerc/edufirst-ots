import React from 'react';
import {Field, reduxForm} from 'redux-form';

const CommentForm = ({handleSubmit}) => (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="comment" component="input" type="text"
               placeholder="Comment here"/>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
);

export default reduxForm({form: 'comment'})(CommentForm);