class TextBlocksController < ApplicationController
  def index
    @blocks = TextBlock.all.to_json
  end

  def data
    @tb = TextBlock.all
    render json: @tb
  end

  def create
    @text_block = TextBlock.create(text_block_params)
    render json: @text_block
  end

  def update
    @text_block = TextBlock.find(params[:id])
    @text_block.update(text_block_params)
    render json: @text_block
  end

  def destroy
    text = TextBlock.find(params[:id])
    text.destroy
  end

  private
  
    def set_text_block
      @block = TextBlock.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def text_block_params
      params.require(:text_block).permit(:entry, :format)
    end
end
