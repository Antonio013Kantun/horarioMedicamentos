class Nodo:
    def __init__(self, valor):
        self.valor = valor
        self.izquierdo = None
        self.derecho = None
        
class ArbolBinario:
    def __init__(self):
        self.raiz = None

    def insertar(self, valor):
        if self.raiz is None:
            self.raiz = Nodo(valor)
        else:
            self._insertar_recursivo(valor, self.raiz)

    def _insertar_recursivo(self, valor, nodo):
        if valor < nodo.valor:
            if nodo.izquierdo is None:
                nodo.izquierdo = Nodo(valor)
            else:
                self._insertar_recursivo(valor, nodo.izquierdo)
        else:
            if nodo.derecho is None:
                nodo.derecho = Nodo(valor)
            else:
                self._insertar_recursivo(valor, nodo.derecho)

    def imprimir_inorden(self):
        self._imprimir_inorden_recursivo(self.raiz)

    def _imprimir_inorden_recursivo(self, nodo):
        if nodo is not None:
            self._imprimir_inorden_recursivo(nodo.izquierdo)
            print(nodo.valor, end=' ')
            self._imprimir_inorden_recursivo(nodo.derecho)

arbol = ArbolBinario()
arbol.insertar(3)
arbol.insertar(1)
arbol.insertar(4)
arbol.insertar(2)

arbol.imprimir_inorden()  # Salida: 1 2 3 4
