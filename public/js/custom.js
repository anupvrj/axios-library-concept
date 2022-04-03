// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

//GET REQUEST WITH AXIOS
function getTodos() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then((res) => {
           // customHeaders();
            showOutput(res)
        })
}

//POST REQUEST WITH AXIOS
function postTodos() {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: 'New Todo',
        completed: false
    })
        .then(res => showOutput(res))
        .catch(err => console.error(err));

}

//PUT REQUEST WITH AXIOS
function putTodos() {
    axios.put('https://jsonplaceholder.typicode.com/todos/1', {
        title: 'Updated Todo',
        completed: true
    })
        .then(res => showOutput(res))
        .catch(err => console.error(err));
}

//PATCH REQUEST WITH AXIOS

function patchTodos() {
    axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
        title: 'Updated Todo',
        completed: true,
        author: 'Anup Kumar'
    })
        .then(res => showOutput(res))
        .catch(err => console.error(err));
}

//SIMULTANIOUS REQUEST WITH AXIOS

function simRequest() {
    axios.all(
        [
            axios.get('https://jsonplaceholder.typicode.com/todos/1'),
            axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
        ]
    )
        .then(([res1, res2]) => showOutput(res2))
        .catch(err => console.error(err));
}




//DELETE REQUEST WITH AXIOS

function deleteTodos() {
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => showOutput(res))
        .catch(err => console.error(err));
}

//CUSTOM HEADERS

function customHeaders() {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'TOKENID-ABC##$Y@##U$%%U%^DHRW((*'
        }
    };

    axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: 'New Todo',
        completed: false
    },config)
        .then(res => showOutput(res))
        .catch(err => console.error(err));

}
// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
    const options = {
      method: 'post',
      url: 'https://jsonplaceholder.typicode.com/todos',
      data: {
        title: 'Hello World'
      },
      transformResponse: axios.defaults.transformResponse.concat(data => {
        data.title = data.title.toUpperCase();
        return data;
      })
    };
  
    axios(options).then(res => showOutput(res));
  }




  // AXIOS INSTANCE
const axiosInstance = axios.create({
    // Other custom settings
    baseURL: 'https://jsonplaceholder.typicode.com'
  });
  // axiosInstance.get('/comments').then(res => showOutput(res));



// CANCEL TOKEN
function cancelToken() {
    const source = axios.CancelToken.source();
  
    axios
      .get('https://jsonplaceholder.typicode.com/todos', {
        cancelToken: source.token
      })
      .then(res => showOutput(res))
      .catch(thrown => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
        }
      });
  
    if (true) {
      source.cancel('Request canceled!');
    }
  }




  // TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
    const options = {
      method: 'post',
      url: 'https://jsonplaceholder.typicode.com/todos',
      data: {
        title: 'Hello World'
      },
      transformResponse: axios.defaults.transformResponse.concat(data => {
        data.title = data.title.toUpperCase();
        return data;
      })
    };
  
    axios(options).then(res => showOutput(res));
  }
  


  // ERROR HANDLING
  function errorHandling() {
    axios
      .get('https://jsonplaceholder.typicode.com/todoss', {
        // validateStatus: function(status) {
        //   return status < 500; // Reject only if status is greater or equal to 500
        // }
      })
      .then(res => showOutput(res))
      .catch(err => {
        if (err.response) {
          // Server responded with a status other than 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
  
          if (err.response.status === 404) {
            alert('Error: Page Not Found');
          }
        } else if (err.request) {
          // Request was made but no response
          console.error(err.request);
        } else {
          console.error(err.message);
        }
      });
  }


  
// SHOW OUTPUT IN WEBPAGE
function showOutput(res) {
    document.getElementById('res').innerHTML = `
      <div class="card card-body mb-4">
        <h5>Status: ${res.status}</h5>
      </div>
      <div class="card mt-3">
        <div class="card-header">
          Headers
        </div>
        <div class="card-body">
          <pre>${JSON.stringify(res.headers, null, 2)}</pre>
        </div>
      </div>
      <div class="card mt-3">
        <div class="card-header">
          Data
        </div>
        <div class="card-body">
          <pre>${JSON.stringify(res.data, null, 2)}</pre>
        </div>
      </div>
      <div class="card mt-3">
        <div class="card-header">
          Config
        </div>
        <div class="card-body">
          <pre>${JSON.stringify(res.config, null, 2)}</pre>
        </div>
      </div>
    `;
}

document.getElementById('get').addEventListener('click', getTodos);

document.getElementById('post').addEventListener('click', postTodos);
document.getElementById('put').addEventListener('click', putTodos);
document.getElementById('patch').addEventListener('click', patchTodos);
document.getElementById('delete').addEventListener('click', deleteTodos);
document.getElementById('sim').addEventListener('click', simRequest);
document.getElementById('cstm-header').addEventListener('click', customHeaders);
document.getElementById('transform').addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);