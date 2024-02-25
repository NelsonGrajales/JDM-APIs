![JDM-APIs log](jdm.png)

# JDM API

## API Reference

#### Get todos los autos

```http
  GET /v1/autos
```

#### Get auto por modelo

```http
  GET /v1/autos?nombreAuto=:modelo
```

| Parameter    | Type     | Description                          |
| :----------- | :------- | :----------------------------------- |
| `nombreAuto` | `string` | **Opcional**. para filtar por modelo |

#### Get un auto

```http
  GET /v1/autos/:id
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Requiere**. Id del auto |

#### Get todas las marcas

```http
  GET /v1/marcas
```

- no requiere parametros

#### Get todos los motores

```http
    GET /v1/motores
```

- no requiere parametros

## Tech Stack

**Server:** Node, Express
