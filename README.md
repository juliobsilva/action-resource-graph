# action-resource-graph

Essa action GitHub recebe o nome e o tipo do recurso do Azure e retorna o `id` do recurso, `name`, `type` e `subscription_id` onde este recurso esta provisionado. ultilizando o `Azure Resource Graph Explorer` para buscar as informações.

## Inputs **Required**

### `resource_name`
### `resource_type`

## Outputs

### `id`               # 'ID do recurso'
### `name`             # 'Nome do recurso'
### `type`             # 'Tipo do recurso'
### `subscription_id`  # 'ID da subscription'

## Example usage

```yaml
uses: juliobsilva/action-resource-graph@v1
with:
  resource_name: 'storageaccountname'
  resource_type: 'Microsoft.Storage/storageAccounts'
```

## Example usage in workflow

```yaml
name: Azure Resource Graph StorageAccounts

on:
  push:
    branches:
      - main

jobs:
  build-resource-graph:
    runs-on: ubuntu-latest

    steps:
      
    - name: Azure Login
      uses: azure/login@v2
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}

    - name: Query Azure Resource Graph
      uses: juliobsilva/action-resource-graph@v1
      with:
        resource_name: "storageaccountname"
        resource_type: "Microsoft.Storage/storageAccounts"
```

## Example usage in workflow

```yaml
name: Azure Resource Graph StorageAccounts

on:
  push:
    branches:
      - main

jobs:
  build-resource-graph:
    runs-on: ubuntu-latest

    steps:
      
    - name: Azure Login
      uses: azure/login@v2
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}

    - name: Query Azure Resource Graph
      id: accessing-outputs
      uses: juliobsilva/action-resource-graph@v1
      with:
        resource_name: "storageaccountname"
        resource_type: "Microsoft.Storage/storageAccounts"

    - name: Displaying the outputs
      run: |
        echo "Resource ID: ${{ steps.accessing-outputs.outputs.id }}"
        echo "Resource Name: ${{ steps.accessing-outputs.outputs.name }}"
        echo "Resource Type: ${{ steps.accessing-outputs.outputs.type }}"
        echo "Subscription ID: ${{ steps.accessing-outputs.outputs.subscription_id }}"

```






