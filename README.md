# Coming soon serverless forms

Serverless forms for Coming soon pages built with AWS Lambda functions.

## Run some local tests

```bash
npx sls invoke local --function mailer --path tests/data.json
```

Executing this command should output a JSON response that contains **statusCode: 200**, if everything was configured properly.

## License

This project is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
