describe('API Automation Test', () => {
    const baseUrl = 'https://gorest.co.in/public-api';
    const token = '14a64b911cbd5b508e053b2b8932d2fa3bb6e131904dc22c6b5fe70bc73b6ea4';
    let userId = '';
  
    it('GET - Retrieve Users', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.not.be.empty;
  
        userId = response.body.data[0].id;
      });
    });
  
    it('POST - Create User', () => {
      const newUser = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        gender: 'male',
        status: 'active',
      };
  
      cy.request({
        method: 'POST',
        url: `${baseUrl}/users`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: newUser
      }).then((response) => {
        expect(response.status).equal(200);
        expect(response.body.data).should(newUser);
      });
    });
  
    it('PUT - Update User', () => {
      const updatedUserData = {
        name: 'Updated Name'
      };
  
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/users/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: updatedUserData
      }).then((response) => {
        expect(response.status).equal(200);
        expect(response.body.data.name).to.eq(updatedUserData.name);
      });
    });
  
    it('DELETE - Delete User', () => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/users/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).equal(200);
      });
    });
  });