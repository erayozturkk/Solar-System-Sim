/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
    
        // Compute the node's transformation matrix
        const nodeTransform = this.trs.getTransformationMatrix();
    
        // Update the transformation matrices
        const transformedModel = MatrixMult(modelMatrix, nodeTransform);
        const transformedModelView = MatrixMult(modelView, nodeTransform);
        const transformedMvp = MatrixMult(mvp, nodeTransform);
    
        // Use the provided normalMatrix to compute transformed normals
        const transformedNormals = MatrixMult(normalMatrix, nodeTransform)

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    
        // Recursively call draw on all children
        for (const child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }
    
}