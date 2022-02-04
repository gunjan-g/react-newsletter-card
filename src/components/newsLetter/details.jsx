import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const DetailsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80%;
  height: 95%;
`;

const Header = styled.h1`
  margin: 0;
  color: #262fec;
  font-weight: 700;
  font-size: 45px;
`;

const SubHeader = styled.h3`
  margin: 10px 0;
  color: #000;
  font-weight: 700;
  font-size: 24px;
`;

const Text = styled.p`
  color: #000;
  font-weight: 500;
  font-size: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  position: relative;
  height: 53px;
  margin-top: 1em;
`;

const InputField = styled.input`
  outline: none;
  border: none;
  background-color: #fff;
  padding-left: 1.5em;
  padding-right: 3em;
  border-radius: 17px;
  font-size: 20px;
  color: #000;
  height: 100%;

  &::placeholder {
    color: #272727;
  }
`;

const SubscribeButton = styled.button`
  position: absolute;
  right: -10px;
  top: 0;
  height: 100%;
  border: none;
  outline: none;
  color: #fff;
  background-color: #262fec;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top-right-radius: 16px;
  padding: 0 10px;
`;

const CustomForm = ({ status, message, onValidated }) => {

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const handleSubmit = (e) => {
      e.preventDefault();
      email &&
      firstName &&
      lastName &&
      email.indexOf("@") > -1 &&
      onValidated({
          EMAIL: email,
          MERGE1: firstName,
          MERGE2: lastName,
      });

  }

  useEffect(() => {
      if(status === "success") clearFields();
  })

  const clearFields = () => {
      setFirstName('');
      setLastName('');
      setEmail('');
  }

  return (
    <form
        className="mc__form"
        onSubmit={(e) => handleSubmit(e)}
    >

          <DetailsContainer>
          <InnerContainer>
          <Header>Hey, wait...</Header>
          <SubHeader>Subscribe to our newsletter!</SubHeader>
          <Text>
            You will never miss our podcasts, latest news, etc. Our newsletter is
            once a week, every wednesday.
          </Text>
          <FormGroup>
          <div className="mc__field-container">
                <InputField
                    label="First Name"
                    onChangeHandler={setFirstName}
                    type="text"
                    value={firstName}
                    placeholder="Jane"
                    isRequired
                />

                <InputField
                    label="Last Name"
                    onChangeHandler={setLastName}
                    type="text"
                    value={lastName}
                    placeholder="Doe"
                    isRequired
                />

                <InputField
                    label="Email"
                    onChangeHandler={setEmail}
                    type="email"
                    value={email}
                    placeholder="your@email.com"
                    isRequired
                />

            </div>

        <SubscribeButton
                label="close"
                size="big"
                customClass="g__justify-self-center"
            /> : <InputField
                label="subscribe"
                type="submit"
                formValues={[email, firstName, lastName]}
            />
        </FormGroup>
      </InnerContainer>
    </DetailsContainer>
    </form>
);
};


export function Details(props) {
  const url = `https://gmail.us20.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`;
  return (
    <MailchimpSubscribe
                url={url}
                render={({ subscribe, status, message }) => (
                    <CustomForm
                        status={status}
                        message={message}
                        onValidated={formData => subscribe(formData)}
                    />
                )}
            />
  );
}