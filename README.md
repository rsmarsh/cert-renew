# cert-renew
Easy way to set up the certificate check when using `sudo certbot certonly --manual`

Sets up an http server then prompts you for the endpoint name, and the contents of the file which need to be returned when the certificate bot hits it.
