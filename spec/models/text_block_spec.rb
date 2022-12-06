require 'rails_helper'

RSpec.describe TextBlock, type: :model do
  before(:each) do
    @block = TextBlock.create(entry: "Example Heading 1", format: "h1")
  end

  describe "Text block CRUD" do
    it 'checks that a block can be created' do
      expect(@block).to be_valid
    end
  
    it 'checks that a block can be read' do
      expect(TextBlock.find_by_entry("Example Heading 1")).to eq(@block)
    end
  
    it 'checks that a block can be updated' do
      @block.update(:format => "p")
      expect(TextBlock.find_by_format("p")).to eq(@block)
    end
  
    it 'checks that a block can be destroyed' do
      count = TextBlock.count
      @block.destroy
      expect(TextBlock.count).to_not eq(count)
    end
  end
end