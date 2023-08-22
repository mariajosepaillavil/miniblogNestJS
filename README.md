## Web APIs with NestJS, Postgres, and Sequelize - A Beginner's Guide

Revisa los cambios que hice y agregué la parte de posts. Hay pequeñas cosas que por versionamiento no se podían realizar, pero no eran indispensables. Mañana vemos cualquier duda

### Coleccion para importar en Postman
<details>
<summary> JSON, click here!! </summary>
```
{
	"info": {
		"_postman_id": "b030dbf5-c610-4b8b-8142-fb3716688952",
		"name": "netjs-guide",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "27995187"
	},
	"item": [
		{
			"name": "GET Post by ID",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/api/v1/posts/1",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"v1",
						"posts",
						"1"
					]
				}
			},
			"response": []
		},
		{
			"name": "GET All Post",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/api/v1/posts",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"v1",
						"posts"
					]
				}
			},
			"response": []
		},
		{
			"name": "SignUp",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "name",
							"value": "yose",
							"type": "text"
						},
						{
							"key": "email",
							"value": "yose@gmail.com",
							"type": "text"
						},
						{
							"key": "password",
							"value": "pass123",
							"type": "text"
						},
						{
							"key": "gender",
							"value": "female",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "http://localhost:3000/api/v1/auth/signup",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"v1",
						"auth",
						"signup"
					]
				}
			},
			"response": []
		},
		{
			"name": "Login",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "username",
							"value": "yose@gmail.com",
							"type": "text"
						},
						{
							"key": "password",
							"value": "pass123",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "http://localhost:3000/api/v1/auth/login",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"v1",
						"auth",
						"login"
					]
				}
			},
			"response": []
		},
		{
			"name": "Posts",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Authorization",
						"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsIm5hbWUiOiJ5b3NlIiwiZW1haWwiOiJ5b3NlQGdtYWlsLmNvbSIsImdlbmRlciI6ImZlbWFsZSIsImNyZWF0ZWRBdCI6IjIwMjMtMDgtMjJUMjM6MDQ6MjcuMTY4WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDgtMjJUMjM6MDQ6MjcuMTY4WiIsImlhdCI6MTY5Mjc0NTQ3MCwiZXhwIjoxNjkyOTE4MjcwfQ.fqga-_ka2Xck2cYFAxL6ooCmBr-EnhBe_M_pCqZ8L2o",
						"type": "text"
					}
				],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "title",
							"value": "Test",
							"type": "text"
						},
						{
							"key": "body",
							"value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget nulla eget nibh congue pharetra. Morbi auctor posuere orci id imperdiet. Nunc laoreet ex nec velit ultricies, a ultrices erat volutpat. Curabitur ut nisl neque. Aenean vitae dapibus libero, et ultricies massa. Maecenas ipsum ligula, posuere nec vulputate non, dictum id erat. Maecenas tempus nulla vel neque mattis tempus. Morbi sit amet mattis ex. Vivamus tincidunt imperdiet augue, eget pellentesque leo. Cras faucibus aliquet felis, ut ullamcorper velit sodales id.",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "http://localhost:3000/api/v1/posts",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"v1",
						"posts"
					]
				}
			},
			"response": []
		},
		{
			"name": "Update Post",
			"request": {
				"method": "PUT",
				"header": [
					{
						"key": "Authorization",
						"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsIm5hbWUiOiJ5b3NlIiwiZW1haWwiOiJ5b3NlQGdtYWlsLmNvbSIsImdlbmRlciI6ImZlbWFsZSIsImNyZWF0ZWRBdCI6IjIwMjMtMDgtMjJUMjM6MDQ6MjcuMTY4WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDgtMjJUMjM6MDQ6MjcuMTY4WiIsImlhdCI6MTY5Mjc0NTQ3MCwiZXhwIjoxNjkyOTE4MjcwfQ.fqga-_ka2Xck2cYFAxL6ooCmBr-EnhBe_M_pCqZ8L2o",
						"type": "text"
					}
				],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "body",
							"value": "Nuevo body",
							"type": "text"
						},
						{
							"key": "title",
							"value": "Update post id 1",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "http://localhost:3000/api/v1/posts/1",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"v1",
						"posts",
						"1"
					]
				}
			},
			"response": []
		},
		{
			"name": "delete Post",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsIm5hbWUiOiJ5b3NlIiwiZW1haWwiOiJ5b3NlQGdtYWlsLmNvbSIsImdlbmRlciI6ImZlbWFsZSIsImNyZWF0ZWRBdCI6IjIwMjMtMDgtMjJUMjM6MDQ6MjcuMTY4WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDgtMjJUMjM6MDQ6MjcuMTY4WiIsImlhdCI6MTY5Mjc0NTQ3MCwiZXhwIjoxNjkyOTE4MjcwfQ.fqga-_ka2Xck2cYFAxL6ooCmBr-EnhBe_M_pCqZ8L2o",
							"type": "string"
						}
					]
				},
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/api/v1/posts/1",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"v1",
						"posts",
						"1"
					]
				}
			},
			"response": []
		}
	]
}

```

</details>

