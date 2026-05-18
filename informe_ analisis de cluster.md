1. **Análisis de cluster**

Para complementar la lectura individual de variables y mapas de posicionamiento, se aplicó un análisis de clusters con el objetivo de identificar grupos de actores con perfiles similares. Este procedimiento permitió reconocer patrones de agrupamiento que no necesariamente son evidentes en el análisis descriptivo, aportando una lectura más sintética de la estructura del ecosistema de actores.

El análisis de clusters se construyó a partir de variables asociadas al posicionamiento estratégico de los actores. Se consideraron principalmente las dimensiones de legitimidad, urgencia, interés e influencia, incorporando variables auxiliares solo en la medida en que aportaran capacidad discriminante y consistencia analítica al modelo.

1. #### **Propósito y alcance del análisis**

El análisis de conglomerados (cluster analysis), se realizó con el propósito de identificar grupos de actores con perfiles relacionales homogéneos internamente y diferenciados entre sí, de modo que las recomendaciones estratégicas de relacionamiento pudieran formularse de forma diferenciada y accionable. No se trata de una tipología conceptual construida a priori, sino de una clasificación empírica derivada de los datos recogidos en el proceso de mapeo. La unidad de análisis es el actor entrevistado (n=73) y las variables utilizadas reflejan dimensiones centrales del relacionamiento institucional y comunitario con FCAB.

El análisis tiene carácter exploratorio y sus resultados deben interpretarse como insumo estratégico, no como categorías rígidas o exhaustivas. La tipología obtenida es sensible a la muestra disponible y podría refinarse con una segunda medición o con la incorporación de actores actualmente no incluidos en el estudio.

2. ####  **Universo de variables disponibles y criterios de selección**

Inicialmente, las variables seleccionadas para realizar este análisis fueron las 8 detalladas en el análisis descriptivo, junto con la variable *Menciones  como actor relevante*, que mide el número de veces que el actor fue mencionado por otros entrevistados.

La selección de variables para el modelo no fue automática: se evaluaron sistemáticamente distintos subconjuntos mediante análisis de correlación, varianza y pruebas comparativas de calidad de agrupamiento. Las variables *Disposición al diálogo* e *Influencia territorial percibida de FCAB* fueron descartadas por razones distintas. La disposición al diálogo presenta una varianza prácticamente nula (varianza \= 0.50, con el 84.7% de los actores en el valor máximo de 7.0), lo que la hace inútil como variable discriminante. Por su parte, la influencia territorial percibida de FCAB captura una percepción sobre la empresa, no sobre la relación, y cuando se incorpora al modelo tiende a generar un conglomerado de apenas 4 o 5 actores sin coherencia interpretativa. Además, las variables *Afectación organizacional percibida* y *Expectativa de consideración* se excluyeron del núcleo del modelo por su alta correlación con las variables relacionales incluidas y porque su incorporación deterioraba los índices de separación entre grupos.

El modelo final utilizó cinco variables: *Calidad percibida de la relación*, *Cercanía relacional percibida*, *Coherencia discurso-práctica percibida*, *Escucha percibida* y *Menciones como actor relevante*. Las cuatro primeras conforman el núcleo relacional del análisis; la quinta aporta una dimensión ortogonal —centralidad en la red— que las otras variables no capturan (correlación con las relacionales \< 0.20 en todos los casos).

3. #### **Determinación del número de clusters**

Se aplicó el algoritmo K-Means con inicialización múltiple (n\_init=20) y semilla fija (random\_state=42) para garantizar la reproducibilidad. Dado que la variable *Menciones como actor relevante* tiene una escala y variabilidad distinta a las demás, todas las variables todas fueron estandarizadas mediante z-score antes del análisis (media=0, desviación estándar=1). Esto impide que variables con mayor varianza absoluta dominen la solución por razones puramente métricas.

El análisis se realizó sobre los 64 actores con información completa en las cinco variables seleccionadas. Los 9 actores con datos faltantes en la variable *Coherencia discurso-práctica percibida*—la única con valores ausentes relevantes (12.5%)— fueron tratados mediante asignación por proximidad, descrita en la sección 6\.

Al realizar el análisis se determinaron tres cluster. Esta elección se fundamenta en la convergencia de tres criterios. El primero de ellos es el criterio del codo, el coeficiente de silueta y el análisis jerárquico de Ward.

4. #### **Pruebas de validación y  Tratamiento de actores con información faltante**

Se realizaron tres pruebas de validación. La estabilidad ante variaciones de inicialización se evaluó con 500 repeticiones del algoritmo con semillas aleatorias distintas, calculando el índice de Rand ajustado (ARI) respecto a la solución de referencia. El ARI medio fue de 0.988 y el 90.4% de las repeticiones produjo asignaciones idénticas (ARI=1.0), confirmando que la misma partición emerge de forma prácticamente determinística. La concordancia con el agrupamiento jerárquico (Ward) arrojó un ARI de 0.615, interpretable como concordancia moderada y esperable entre métodos que priorizan distintos criterios de cohesión. 

Dado que nueve actores no respondieron la pregunta de coherencia discurso/práctica, única variable del modelo con datos ausentes. Dado que se trata del discriminador más fuerte entre C1 y C2, se descartó la imputación por media o mediana para evitar sesgo sistemático. En su lugar, se asignó cada actor al cluster cuyo centroide resultara más próximo en distancia euclidiana, imputando temporalmente el valor de coherencia con la media del cluster candidato y calculando la distancia con las cuatro variables disponibles. La distribución final quedó conformada por 32 actores en C0, 32 en C2 y 8 en C3. 

5. **Limitaciones del análisis de clusters**

Se deben considerar cuatro limitaciones para interpretar los resultados. Primero, el análisis se basa en una muestra acotada de 72 actores, cercana al umbral mínimo recomendado para K-Means. Esto afecta especialmente al C3, compuesto por 8 actores, por lo que sus resultados deben leerse con mayor cautela que los clusters de mayor tamaño.

Segundo, la variable de coherencia discurso-práctica presenta la mayor tasa de no respuesta, con un 12,5%. Esta ausencia no necesariamente es aleatoria, ya que puede reflejar menor familiaridad con la operación de FCAB o una relación más distante con la empresa, lo que también constituye información relevante para el análisis.

Tercero, los clusters reflejan el estado del relacionamiento en el momento del levantamiento. Dado que las percepciones pueden cambiar por contingencias territoriales, ajustes institucionales o modificaciones en la estrategia de relacionamiento, se recomienda replicar el análisis en un ciclo de dos años.

Finalmente, el universo de actores no es exhaustivo. Algunos grupos, como comunidades indígenas del Alto Loa, organizaciones de Ollagüe y actores privados de menor visibilidad, no quedaron suficientemente representados. Su incorporación en una segunda fase podría modificar la distribución de los clusters, especialmente en la dimensión territorial.

6. ### **Tipología de actores**

A continuación se presenta la descripción de los clusters identificados (el detalle de actores que compone cada cluster está disponible en el anexo X). Estos corresponden a agrupaciones de actores construidas a partir de similitudes en sus variables seleccionadas, permitiendo distinguir perfiles diferenciados dentro del ecosistema territorial de FCAB. Esta aproximación permite pasar de una caracterización individual de actores a una segmentación comparativa, útil para identificar prioridades, brechas relacionales y estrategias diferenciadas de vinculación

- #### **Cluster 1: Actores distantes o en relación deteriorada (n=32)**

Son quienes evalúan el vínculo con FCAB como insuficiente o deteriorado, con baja percepción de coherencia y escucha. No se trata necesariamente de actores en conflicto abierto: en muchos casos la distancia refleja ausencia más que tensión, es decir, un relacionamiento que nunca se construyó o que se interrumpió sin reencuadre explícito. Concentran organizaciones de base territorial, actores de sociedad civil y medios de comunicación, distribuidos principalmente en Antofagasta, con presencia relevante en Sierra Gorda, Baquedano y Mejillones.

- #### **Cluster 2: Actores vinculados con relación positiva (n=33)**

Son quienes mantienen con FCAB una relación de alta calidad y cercanía, perciben coherencia entre el discurso y la práctica de la empresa, y se sienten escuchados cuando plantean propuestas o preocupaciones. Predominan las juntas de vecinos y organizaciones comunitarias de Antofagasta y Calama, junto a actores del sector público de nivel comunal y algunos actores del sector productivo. El riesgo específico de este grupo no es el conflicto sino el mantenimiento: el vínculo está sostenido en gran medida en relaciones personales con referentes comunitarios y es sensible a rotaciones de personal o discontinuidades en la gestión. 

- #### **Cluster 3: Actores de alta centralidad y relación instrumental (n=8)**

Este grupo se distingue por su peso en la red territorial: son los actores que el resto del ecosistema identifica como más influyentes, con un promedio de 11 menciones como actor relevante.Además, tienen la expectativa de escucha más alta del estudio (6.25/7), que combinada con evaluaciones intermedias de coherencia, sugiere que estos actores perciben una brecha entre el peso que tienen en el territorio y el reconocimiento que reciben de FCAB en la toma de decisiones. Además, la presencia de empresas mientras en este cluster también abre una dimensión de coordinación intersectorial que FCAB podría aprovechar para construir plataformas de relacionamiento compartido con el sector productivo.

Este cluster concentra el mayor riesgo reputacional e institucional para FCAB, y a la vez la mayor oportunidad de legitimación territorial. Una relación instrumental o transaccional con estos actores —sin canales formales de diálogo, sin trazabilidad de compromisos y sin gestión proactiva de expectativas— puede derivar en posicionamientos críticos que escalan rápidamente en la agenda pública. 