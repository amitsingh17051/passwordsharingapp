import { faker } from '@faker-js/faker';

export const generateCredetials = (num) => {
    const credetial = [];
  
    for (let i = 0; i < num; i++) {

      const title = faker.lorem.sentences(2);
      const url = faker.internet.url({ protocol: 'http', appendSlash: false })
      const username = faker.lorem.sentences(1);
      const password = faker.lorem.sentences(1);
      const credentail_details = faker.lorem.sentences(10);
  
      credetial.push({
        title,
        url,
        username,
        password,
        credentail_details,
      });
    }
  
    return credetial;
};

