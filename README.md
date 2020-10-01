# MongoDB CRUD REST API

A simple RESTful API for a MongoDB Database

## API

| Route | Method | Query / Body | Description |
| --- | --- | --- | --- |
| /collections | GET | - | Get a list of all available collections |
| /collections/COLLECTION_NAME | POST | properties (JSON) | Creates a document in the collection called "COLLECTION_NAME" |
| /collections/COLLECTION_NAME | GET | - | Get all documents from the collection called "COLLECTION_NAME" |
| /collections/COLLECTION_NAME | DELETE | - | Drop the collection called "COLLECTION_NAME" |
| /collections/COLLECTION_NAME/DOCUMENT_ID | GET | - | Get the document with the ID "DOCUMENT_ID" from the collection called "COLLECTION_NAME" |
| /collections/COLLECTION_NAME/DOCUMENT_ID | DELETE | - | Delete the document with the ID "DOCUMENT_ID" from the collection called "COLLECTION_NAME" |
| /collections/COLLECTION_NAME/DOCUMENT_ID | PUT | properties (JSON) | Replace the properties of  the document with the ID "DOCUMENT_ID" from the collection called "COLLECTION_NAME" |
| /collections/COLLECTION_NAME/DOCUMENT_ID | PATCH | properties (JSON) | Update the properties of the document with the ID "DOCUMENT_ID" from the collection called "COLLECTION_NAME" |

## Environment variables


| Variable | Description |
| --- | --- |
| MONGODB_URL | The URL of the MongoDB database to be used by the service |
| MONGODB_DB_NAME | OPTIONAL The name of the database to be used by the service |

## Deployment

### Docker

```
docker run -e MONGODB_URL=http://your-db-url 172.16.98.151:5000/mongodb-crud-rest-api
```
